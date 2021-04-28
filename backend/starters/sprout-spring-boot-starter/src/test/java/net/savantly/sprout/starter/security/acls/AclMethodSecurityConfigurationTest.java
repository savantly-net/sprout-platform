package net.savantly.sprout.starter.security.acls;

import static org.junit.jupiter.api.Assertions.assertThrows;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.test.context.support.WithMockUser;

import example.domain.ProtectedApi;
import example.domain.ProtectedObject;
import example.domain.ProtectedObjectRepo;
import net.savantly.sprout.core.security.permissions.Permission;
import net.savantly.sprout.core.security.permissions.SproutPermissionEvaluator;
import net.savantly.sprout.core.tenancy.TenantedPrimaryKey;
import net.savantly.sprout.starter.security.acls.AclMethodSecurityConfigurationTest.TestContext.ProtectedService;
import net.savantly.sprout.test.AbstractContainerBaseTest;
import net.savantly.sprout.test.IntegrationTest;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT, properties = {
		"sprout.jpa.packagesToScan=example.domain" })
@IntegrationTest
public class AclMethodSecurityConfigurationTest extends AbstractContainerBaseTest {

	@Autowired
	ProtectedService service;

	@Autowired
	ProtectedApi api;

	@Autowired
	ProtectedObjectRepo repo;

	private static String notok = "notok";

	private String createOneWithId() {
		String id = UUID.randomUUID().toString();
		return createOneWithId(id);
	}

	private String createOneWithId(String id) {
		ProtectedObject o = repo.findByIdItemId(id).orElse(new ProtectedObject());
		TenantedPrimaryKey oid = new TenantedPrimaryKey();
		oid.setItemId(id);
		o.setId(oid);
		repo.save(o);
		repo.flush();
		return id;
	}
	
	@BeforeEach
	public void beforeEach() {
		repo.deleteAll();
	}

	@Test
	@WithMockUser(username = "me")
	public void givenNoRole_ServiceShouldFailToCreate() {
		assertThrows(AccessDeniedException.class, () -> {
			service.create(new ProtectedObject());
		});
	}

	@Test
	@WithMockUser(username = "me", authorities = { "CREATE" })
	public void givenCreateRole_ServiceShouldSucceed() {
		service.create(new ProtectedObject());
	}

	@Test
	@WithMockUser(username = "me")
	public void givenNoRole_ApiShouldFailToCreate() {
		assertThrows(AccessDeniedException.class, () -> {
			api.create(new ProtectedObject());
		});
	}

	@Test
	@WithMockUser(username = "me", authorities = { "CREATE" })
	public void givenCreateRole_ApiShouldSucceed() {
		api.create(new ProtectedObject());
	}

	@Test
	@WithMockUser(username = "me", authorities = { "UPDATE" })
	public void givenUpdateRole_ApiShouldSucceed() {
		api.update(createOneWithId(), new ProtectedObject());
	}

	@Test
	@WithMockUser(username = "me", authorities = { "READ" })
	public void givenOffLimitsId_ApiShouldFailToRead() {
		assertThrows(AccessDeniedException.class, () -> {
			api.getByItemId(createOneWithId(notok));
		});
	}

	@Test
	@WithMockUser(username = "me", authorities = { "READ" })
	public void givenWrongRole_ApiShouldFailToDelete() {
		assertThrows(AccessDeniedException.class, () -> {
			api.deleteById("doesnt matter");
		});
	}

	@Test
	@WithMockUser(username = "me", authorities = { "CREATE", "DELETE" })
	public void givenDeleteRole_ApiShouldSucceed() {
		api.deleteById(createOneWithId());
	}

	@Test
	@WithMockUser(username = "me", authorities = { "READ" })
	public void givenReadRole_ApiShouldSucceed() {
		api.getByItemId(createOneWithId());
	}

	@Test
	@WithMockUser(username = "other", authorities = { "READ" })
	public void givenReadRole_EvaluatorWontGetCalled() {
		api.getAll(Pageable.unpaged());
	}

	@Configuration
	@EnableAutoConfiguration
	@EnableJpaRepositories({ "example.domain" })
	@EntityScan({ "example.domain" })
	static class TestContext {

		@Bean
		public SproutPermissionEvaluator<ProtectedObject> exampleSproutPermissionEvaluator() {
			return new SproutPermissionEvaluator<ProtectedObject>() {

				@Override
				public boolean hasPermission(Authentication authentication, Serializable targetId, String targetType,
						Permission permission) {
					if (!hasAuthority(authentication, permission)) {
						return false;
					}
					// simulate off-limits by id
					if (isFilteredId(targetId)) {
						return false;
					}
					return true;
				}

				@Override
				// simple authority matcher for tests
				public boolean hasPermission(Authentication authentication, ProtectedObject targetDomainObject,
						Permission permission) {
					if (isFilteredId(targetDomainObject)) {
						return false;
					}
					return hasAuthority(authentication, permission);
				}

				@Override
				public List<String> getEvaluationType() {
					List<String> list = new ArrayList<>();
					list.add(ProtectedObject.class.getName());
					return list;
				}

				private boolean isFilteredId(Object object) {
					if (Objects.nonNull(object) && object.getClass().isAssignableFrom(String.class)
							&& ((String) object).contentEquals(notok)) {
						return true;
					} else if (Objects.nonNull(object) && object.getClass().isAssignableFrom(ProtectedObject.class)) {
						ProtectedObject o = ((ProtectedObject) object);
						if (Objects.nonNull(o.getId()) && o.getItemId().contentEquals(notok)) {
							return true;
						}
					}
					return false;
				}

				private boolean hasAuthority(Authentication authentication, Permission permission) {
					if (authentication.getAuthorities().stream()
							.anyMatch(g -> g.getAuthority().contentEquals(permission.name()))) {
						return true;
					} else {
						return false;
					}
				}

			};
		}

		@Bean
		public ProtectedService protectedService() {
			return new ProtectedService();
		}

		@Bean
		public ProtectedApi protectedApi(ProtectedObjectRepo repository) {
			return new ProtectedApi(repository);
		}

		static class ProtectedService {
			@PreAuthorize("hasPermission(#object, 'CREATE')")
			public ProtectedObject create(ProtectedObject object) {
				return object;
			}
		}

	}
}
