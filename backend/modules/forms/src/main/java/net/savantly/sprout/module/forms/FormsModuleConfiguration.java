package net.savantly.sprout.module.forms;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import lombok.Data;
import net.savantly.sprout.core.domain.tenant.TenantRepository;
import net.savantly.sprout.core.module.SproutModuleConfiguration;
import net.savantly.sprout.module.forms.proxy.FormioProxy;

/**
 * 
 * An example of how the 'application.properties' values can be injected at runtime into other beans
 *
 */
@Data
@SproutModuleConfiguration
@EntityScan
@EnableJpaRepositories
@ConfigurationProperties("sprout.plugins.forms")
public class FormsModuleConfiguration {
	
	private String formioApiUrl = "http://localhost:3001";
	private String jwtSecret = "CHANGEME";
	private String formioAdminUsername = "admin@example.com";
	private String formioAdminPassword = "password";
	
	@Bean
	public FormioProxy formioProxy(TenantRepository tenantRepository) {
		return FormioProxy.builder()
				.formioClient(new RestTemplateBuilder().rootUri(formioApiUrl).build())
				.adminUsername(formioAdminUsername)
				.adminPassword(formioAdminPassword)
				.build();
	}
	
	@Bean
	public FormioProxyApi formioProxyApi(FormioProxy proxy) {
		return new FormioProxyApi();
	}

}
