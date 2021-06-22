package net.savantly.sprout.starter.security.acls;

import static org.junit.jupiter.api.Assertions.assertThrows;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

import javax.persistence.EntityManagerFactory;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringBootConfiguration;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit.jupiter.web.SpringJUnitWebConfig;

import com.fasterxml.jackson.databind.util.Converter;
import com.fasterxml.jackson.databind.util.StdConverter;

import example.domain.ProtectedApi;
import example.domain.ProtectedObject;
import example.domain.ProtectedObjectRepository;
import example.domain.ProtectedService;
import net.savantly.sprout.core.security.permissions.DelegatingPermissionEvaluator;
import net.savantly.sprout.core.security.permissions.Permission;
import net.savantly.sprout.core.security.permissions.SproutPermissionEvaluator;
import net.savantly.sprout.core.security.permissions.SproutPermissionRegistry;

@SpringJUnitWebConfig
@WebMvcTest
public class AclMethodSecurityConfigurationTest {

	@Autowired
	ProtectedService service;

	@Autowired
	ProtectedApi api;

	@MockBean
	ProtectedObjectRepository repo;
	@MockBean
	EntityManagerFactory emf;

	private static String notok = "notok";

	private String createOneWithId() {
		String id = UUID.randomUUID().toString();
		return createOneWithId(id);
	}

	private String createOneWithId(String id) {
		ProtectedObject o = repo.findById(id).orElse(new ProtectedObject());
		o.setId(id);
		repo.save(o);
		return id;
	}
	
	@BeforeEach
	public void beforeEach() {
		repo.deleteAll();
		Mockito.when(repo.findById(Mockito.anyString())).thenReturn(Optional.of(new ProtectedObject()));
	}

	@Test
	@WithMockUser(username = "me")
	public void givenNoRole_ServiceShouldFailToCreate() {
		assertThrows(AccessDeniedException.class, () -> {
			service.createOne(new ProtectedObject());
		});
	}

	@Test
	@WithMockUser(username = "me", authorities = { "CREATE" })
	public void givenCreateRole_ServiceShouldSucceed() {
		service.createOne(new ProtectedObject());
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
	@WithMockUser(username = "me", authorities = { "READ" })
	public void givenOffLimitsId_ApiShouldFailToRead() {
		assertThrows(AccessDeniedException.class, () -> {
			api.getById(createOneWithId(notok));
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
	@WithMockUser(username = "me", authorities = { "READ", "CREATE", "DELETE" })
	public void givenDeleteRole_ApiShouldSucceed() {
		api.deleteById(createOneWithId());
	}

	@Test
	@WithMockUser(username = "me", authorities = { "READ" })
	public void givenReadRole_ApiShouldSucceed() {
		api.getById(createOneWithId());
	}


	@SpringBootConfiguration
	@Import(AclMethodSecurityConfiguration.class)
	static class TestContext {
		
		@Bean
		public SproutPermissionRegistry sproutPermissionRegistry(Set<SproutPermissionEvaluator> evaluatorBeans) {
			return new SproutPermissionRegistry(evaluatorBeans);
		}
		
		@Bean
		public DelegatingPermissionEvaluator delegatingPermissionEvaluator(SproutPermissionRegistry registry) {
			return new DelegatingPermissionEvaluator(registry);
		}

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
						if (Objects.nonNull(o.getId()) && o.getId().contentEquals(notok)) {
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
		public Converter<ProtectedObject, ProtectedObject> ProtectedObjectConverter() {
			return new StdConverter<ProtectedObject, ProtectedObject>() {
				@Override
				public ProtectedObject convert(ProtectedObject value) {
					return value;
				}
			};
		}

		@Bean
		public ProtectedService protectedService(ProtectedObjectRepository repo) {
			return new ProtectedService(repo, ProtectedObjectConverter(), ProtectedObjectConverter());
		}

		@Bean
		public ProtectedApi protectedApi(ProtectedService service) {
			return new ProtectedApi(service);
		}

	}
}
