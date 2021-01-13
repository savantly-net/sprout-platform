package net.savantly.sprout.domain.issue;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import net.savantly.sprout.core.tenancy.TenantKeyedRepository;

@Configuration
public class IssueConfiguration {

	@Bean
	public IssueApi issueApi(TenantKeyedRepository<Issue> repository) {
		return new IssueApi(repository);
	}
}
