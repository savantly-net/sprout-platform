package net.savantly.sprout.domain.issue;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.EntityManagerFactory;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.Authentication;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit.jupiter.SpringJUnitConfig;

import net.savantly.sprout.core.security.permissions.DelegatingPermissionEvaluator;
import net.savantly.sprout.core.security.permissions.Permission;
import net.savantly.sprout.core.security.permissions.SproutPermissionEvaluator;
import net.savantly.sprout.core.security.permissions.SproutPermissionRegistry;
import net.savantly.sprout.starter.security.acls.AclMethodSecurityConfiguration;

@SpringJUnitConfig
public class IssueServiceTest {
	
	@MockBean
	EntityManagerFactory emf;

	@Autowired
	IssueRepository repo;
	
	@Autowired
	IssueService service;

	@BeforeEach
	public void beforeEach() {

		Mockito.when(repo.findAll(Mockito.any(Pageable.class))).thenReturn(fakeIssues());
		Mockito.when(repo.save(Mockito.any(Issue.class))).thenReturn(aSingleFakeIssue());
	}
	
	@Test
	@WithMockUser(username = "invalid")
	public void testIssueServiceRead() {

		Page<IssueDto> page = service.findAll(Pageable.unpaged());
		Assertions.assertEquals(1, page.getSize());
		
		Assertions.assertThrows(AccessDeniedException.class, () -> {
			service.createOne(new IssueDto().setTitle("test").setDescription("test"));
		});
	}
	
	@Test
	@WithMockUser(username = "admin", authorities = "ADMIN")
	public void testIssueServiceCreate() {
		service.createOne(new IssueDto().setTitle("test").setDescription("test"));
	}
	

	private Issue aSingleFakeIssue() {
		return new Issue().setTitle("saved");
	}

	
	private PageImpl<Issue> fakeIssues() {
		List<Issue> content = new ArrayList<>();
		content.add(new Issue().setTitle("test"));
		return new PageImpl<Issue>(content );
	}
	
	@TestConfiguration
	@EnableWebSecurity
	@Import(AclMethodSecurityConfiguration.class)
	static class TestConfig {
		
		@Bean
		public IssueRepository issueRepo() {
			return  Mockito.mock(IssueRepository.class);
		}
		
		@Bean
		public IssueService issueService(IssueRepository repo) {
			return new IssueService(repo, new IssueDtoConverter(), new IssueEntityConverter());
		}
		
		@Bean
		public SproutPermissionRegistry permissionRegistry() {
			Set<SproutPermissionEvaluator> evaluatorBeans = new HashSet<>();
			
			evaluatorBeans.add(new SproutPermissionEvaluator<IssueDto>() {

				@Override
				public List<String> getEvaluationType() {
					return Arrays.asList(IssueDto.class.getName());
				}

				@Override
				public boolean hasPermission(Authentication authentication, IssueDto targetDomainObject,
						Permission permission) {
					if (authentication.getAuthorities().stream().anyMatch(g -> g.getAuthority().contentEquals("ADMIN"))) {
						return true;
					} else return false;
				}

				@Override
				public boolean hasPermission(Authentication authentication, Serializable targetId, String targetType,
						Permission permission) {
					// TODO Auto-generated method stub
					return false;
				}
			});
			return new SproutPermissionRegistry(evaluatorBeans);
		}
		
		@Bean
		public DelegatingPermissionEvaluator permissionEvaluator(SproutPermissionRegistry registry) {
			return new DelegatingPermissionEvaluator(registry);
		}
		
	}
}
