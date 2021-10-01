package net.savantly.sprout.domain;

import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

import net.savantly.sprout.autoconfigure.properties.SproutConfigurationProperties;
import net.savantly.sprout.core.domain.privilege.PrivilegeRepository;
import net.savantly.sprout.core.domain.role.RoleRepository;
import net.savantly.sprout.core.domain.user.repository.UserRepository;
import net.savantly.sprout.domain.account.AccountApi;
import net.savantly.sprout.domain.authentication.LoginApi;
import net.savantly.sprout.domain.branding.BrandingApi;
import net.savantly.sprout.domain.branding.DefaultBrandingApi;
import net.savantly.sprout.domain.dashboard.DashboardConfiguration;
import net.savantly.sprout.domain.feed.FeedConfiguration;
import net.savantly.sprout.domain.file.FileProviderConfiguration;
import net.savantly.sprout.domain.folder.FolderConfiguration;
import net.savantly.sprout.domain.home.HomePageConfiguration;
import net.savantly.sprout.domain.issue.IssueConfiguration;
import net.savantly.sprout.domain.mail.MailConfiguration;
import net.savantly.sprout.domain.menu.MenuConfiguration;
import net.savantly.sprout.domain.permissions.PermissionsApi;
import net.savantly.sprout.domain.proxy.ProxyApi;
import net.savantly.sprout.domain.uiProperties.UIPropertiesConfiguration;
import net.savantly.sprout.domain.user.search.UserSearchApi;
import net.savantly.sprout.domain.widget.WidgetConfiguration;

@Configuration
@Import({
	DashboardConfiguration.class, 
	FeedConfiguration.class, 
	FileProviderConfiguration.class,
	FolderConfiguration.class,
	HomePageConfiguration.class,
	IssueConfiguration.class, 
	UIPropertiesConfiguration.class, 
	MailConfiguration.class,
	MenuConfiguration.class, 
	WidgetConfiguration.class
})
public class DomainConfiguration {


	@Bean
	public AccountApi defaultAccountApi() {
		return new AccountApi();
	}

	@Bean
	public LoginApi defaultLoginApi() {
		return new LoginApi();
	}

	@Bean
	@ConditionalOnMissingBean
	public BrandingApi defaultBrandingApi() {
		return new DefaultBrandingApi();
	}

	@Bean
	public PermissionsApi permissionsApi(RoleRepository roleRepo, PrivilegeRepository privilegeRepo) {
		return new PermissionsApi(roleRepo, privilegeRepo);
	}

	@Bean
	@ConditionalOnMissingBean
	public ProxyApi defaultProxyApi(SproutConfigurationProperties props) {
		return new ProxyApi(props);
	}

	@Bean
	public UserSearchApi userSearchApi(UserRepository repo) {
		return new UserSearchApi(repo);
	}
	
}
