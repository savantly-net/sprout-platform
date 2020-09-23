package net.savantly.sprout.core;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import net.savantly.sprout.core.tenancy.TenantedRepositoryAspect;

@SpringBootApplication
@EnableAspectJAutoProxy
@SuppressWarnings("deprecation")
public class TestApplication {
	
	@Bean
	public PasswordEncoder passwordEncoder() {
		return NoOpPasswordEncoder.getInstance();
	}
	
	@Bean
	public TenantedRepositoryAspect tenantedRepositoryAspect() {
		return new TenantedRepositoryAspect();
	}

}
