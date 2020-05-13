package net.savantly.sprout.autoconfigure;

import org.springframework.boot.autoconfigure.AutoConfigureBefore;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurerAdapter;

import net.savantly.sprout.core.content.contentField.ContentField;
import net.savantly.sprout.core.content.contentItem.ContentItem;
import net.savantly.sprout.core.content.contentTemplate.ContentTemplate;
import net.savantly.sprout.core.content.contentType.ContentType;
import net.savantly.sprout.core.content.webPage.WebPage;
import net.savantly.sprout.core.content.webPageContent.WebPageContent;
import net.savantly.sprout.core.content.webPageLayout.WebPageLayout;
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
@AutoConfigureBefore(SproutWebMvcAutoConfiguration.class)
public class SproutRepositoryRestAutoConfiguration {
	
	public static Class[] ENTITIES = {
		AppSetting.class,
		Role.class,
		EmailAddress.class, 
		SproutUserEntity.class, 
		ContentTemplate.class, 
		ContentType.class, 
		ContentItem.class, 
		ContentField.class,
		Menu.class,
		OAuthAccount.class,
		Organization.class,
		Privilege.class,
		SproutModuleRegistration.class,
		TenantEntity.class,
		WebPage.class, 
		WebPageLayout.class,
		WebPageContent.class
	};

	@Configuration
	static class SproutRepositoryRestConfigurer extends RepositoryRestConfigurerAdapter {

		@Override
		public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
			config.setReturnBodyOnCreate(true);
			config.setReturnBodyForPutAndPost(true);
			config.setBasePath("/api");
			config.exposeIdsFor(ENTITIES);
		}
	}

}
