package net.savantly.sprout.autoconfigure;

import org.springframework.boot.autoconfigure.AutoConfigureBefore;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;

import net.savantly.sprout.core.domain.emailAddress.EmailAddress;
import net.savantly.sprout.core.domain.menu.Menu;
import net.savantly.sprout.core.domain.oauth.OAuthAccount;
import net.savantly.sprout.core.domain.organization.Organization;
import net.savantly.sprout.core.domain.tenant.TenantEntity;
import net.savantly.sprout.core.domain.user.SproutUserEntity;
import net.savantly.sprout.core.module.registration.SproutModuleRegistration;
import net.savantly.sprout.core.security.privilege.Privilege;
import net.savantly.sprout.core.security.role.Role;
import net.savantly.sprout.settings.AppSetting;

@Configuration
public class SproutRepositoryRestAutoConfiguration {
	
	public static Class[] ENTITIES = {
		AppSetting.class,
		Role.class,
		EmailAddress.class, 
		SproutUserEntity.class, 
		Menu.class,
		OAuthAccount.class,
		Organization.class,
		Privilege.class,
		SproutModuleRegistration.class,
		TenantEntity.class
	};

	@Configuration
	@AutoConfigureBefore(SproutWebMvcAutoConfiguration.class)
	static class SproutRepositoryRestConfigurer implements RepositoryRestConfigurer {

		@Override
		public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
			config.setReturnBodyOnCreate(true);
			config.setReturnBodyForPutAndPost(true);
			config.setBasePath("/api/repo");
			config.exposeIdsFor(ENTITIES);
		}
	}

}
