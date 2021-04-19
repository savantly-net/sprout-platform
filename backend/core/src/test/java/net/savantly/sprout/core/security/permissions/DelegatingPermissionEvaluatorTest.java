package net.savantly.sprout.core.security.permissions;

import static org.junit.jupiter.api.Assertions.assertThrows;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.core.Authentication;
import org.springframework.security.test.context.support.WithMockUser;

import net.savantly.sprout.core.DataIntegrationTest;
import net.savantly.sprout.core.security.permissions.DelegatingPermissionEvaluatorTest.TestContext.ProtectedObject;
import net.savantly.sprout.core.security.permissions.DelegatingPermissionEvaluatorTest.TestContext.ProtectedService;

@DataIntegrationTest
public class DelegatingPermissionEvaluatorTest {
	
	@Autowired
	ProtectedService service;

	@Test
	@WithMockUser(username = "anon")
	public void givenNoRoleShouldFailToCreate() {
		assertThrows(AccessDeniedException.class, ()-> {
			service.create(new ProtectedObject());
		});
	}

	@Test
	@WithMockUser(username = "anon",authorities = {"CREATE"})
	public void givenCreateRoleShouldSucceed() {
		service.create(new ProtectedObject());
	}

	
	@TestConfiguration
	@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled = true, jsr250Enabled = true)
	static class TestContext {
		
		@Bean
		public DelegatingPermissionEvaluator delegatingPermissionEvaluator(SproutPermissionRegistry registry) {
			return new DelegatingPermissionEvaluator(registry);
		}
		
		@Bean
		public SproutPermissionRegistry defaultSproutPermissionRegistry(Set<SproutPermissionEvaluator> evaluatorBeans) {
			return new SproutPermissionRegistry(evaluatorBeans);
		}
		
		@Bean
		public SproutPermissionEvaluator exampleSproutPermissionEvaluator() {
			return new SproutPermissionEvaluator<ProtectedObject>() {

				@Override
				public boolean hasPermission(Authentication authentication, Serializable targetId, String targetType,
						Permission permission) {
					// TODO Auto-generated method stub
					return false;
				}

				@Override
				public boolean hasPermission(Authentication authentication, ProtectedObject targetDomainObject,
						Permission permission) {
					if (authentication.getAuthorities().stream().anyMatch(g -> g.getAuthority().contentEquals(permission.name()))) {
						return true;
					} else {
						return false;
					}
				}

				@Override
				public List<String> getEvaluationType() {
					List<String> list = new ArrayList<>();
					list.add(ProtectedObject.class.getName());
					list.add(ProtectedObject.class.getName() + ".ID");
					return list;
				}
				
			};
		}
		
		@Bean
		public ProtectedService protectedService() {
			return new ProtectedService();
		}
		
		static class ProtectedObject {
			String id = "test";
		}
		
		static class ProtectedService {
			@PreAuthorize("hasPermission(#object, 'CREATE')")
			public ProtectedObject create(ProtectedObject object) {
				return object;
			}
			
			@PreAuthorize("hasPermission(#object, 'CREATE')")
			public ProtectedObject byId(ProtectedObject object) {
				return object;
			}
		}
	}
}
