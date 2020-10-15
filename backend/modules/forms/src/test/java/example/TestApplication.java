package example;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import net.savantly.sprout.core.tenancy.TenantedRepositoryAspect;

@SpringBootApplication
@EnableAspectJAutoProxy
@SuppressWarnings("deprecation")
@EnableJpaRepositories(basePackages = {"net.savantly.sprout"})
@EntityScan(basePackages = {"net.savantly.sprout"})
public class TestApplication {
	
	@Bean
	public TenantedRepositoryAspect tenantedRepositoryAspect() {
		return new TenantedRepositoryAspect();
	}

}
