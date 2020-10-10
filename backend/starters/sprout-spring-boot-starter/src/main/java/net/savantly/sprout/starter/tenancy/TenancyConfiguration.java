package net.savantly.sprout.starter.tenancy;

import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import net.savantly.sprout.core.domain.tenant.TenantRepository;
import net.savantly.sprout.core.tenancy.TenantedRepositoryAspect;

@Configuration
public class TenancyConfiguration {

	@Bean(name = "tenantInterceptor")
	@ConditionalOnMissingBean(name = "tenantInterceptor")
	public TenantInterceptor tenantInterceptor(TenantRepository repository) {
		return new TenantInterceptor(repository);
	}
	

	@Bean(name = "tenantedRepositoryAspect")
	@ConditionalOnMissingBean(name = "tenantedRepositoryAspect")
	public TenantedRepositoryAspect tenantedRepositoryAspect() {
		return new TenantedRepositoryAspect();
	}
}
