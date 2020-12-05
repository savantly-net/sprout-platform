package net.savantly.sprout.starter.mvc;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.autoconfigure.ImportAutoConfiguration;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.autoconfigure.web.servlet.WebMvcAutoConfiguration;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.format.FormatterRegistry;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;
import net.savantly.sprout.autoconfigure.properties.SproutConfigurationProperties;
import net.savantly.sprout.controllers.DefaultMvcController;
import net.savantly.sprout.controllers.LoginController;
import net.savantly.sprout.controllers.PluginsApi;
import net.savantly.sprout.controllers.argument.TenantIdArgumentResolver;
import net.savantly.sprout.core.domain.privilege.PrivilegeRepository;
import net.savantly.sprout.core.domain.role.RoleRepository;
import net.savantly.sprout.core.domain.tenant.TenantRepository;
import net.savantly.sprout.core.module.registration.SproutModuleRegistrationRepository;
import net.savantly.sprout.domain.account.AccountApi;
import net.savantly.sprout.domain.authentication.LoginApi;
import net.savantly.sprout.domain.branding.BrandingApi;
import net.savantly.sprout.domain.branding.DefaultBrandingApi;
import net.savantly.sprout.domain.dashboard.DashboardConfiguration;
import net.savantly.sprout.domain.folder.FolderConfiguration;
import net.savantly.sprout.domain.menu.MenuConfiguration;
import net.savantly.sprout.domain.permissions.PermissionsApi;
import net.savantly.sprout.domain.uiProperties.UIPropertiesConfiguration;
import net.savantly.sprout.module.PluginService;

@Configuration
@ImportAutoConfiguration({ WebMvcAutoConfiguration.class })
@Import({DashboardConfiguration.class, UIPropertiesConfiguration.class, MenuConfiguration.class, FolderConfiguration.class})
@RequiredArgsConstructor
public class SproutWebMvcConfigurer implements WebMvcConfigurer {

	private static final Logger log = LoggerFactory.getLogger(SproutWebMvcConfigurer.class);

	private final TenantRepository tenantRepo;

	private final SproutConfigurationProperties sproutConfiguration;

	@Override
	public void addCorsMappings(CorsRegistry registry) {
		log.info("adding CORS mapping for web mvc");
		registry.addMapping("/**").allowCredentials(sproutConfiguration.getCors().isAllowCredentials())
				.allowedHeaders(sproutConfiguration.getCors().getAllowedHeaders())
				.allowedMethods(sproutConfiguration.getCors().getAllowedMethods())
				.allowedOrigins(sproutConfiguration.getCors().getAllowedOrigins());
	}

	@Override
	public void addFormatters(FormatterRegistry registry) {
		log.info("adding TenantIdArgumentResolver to the FormatterRegistry");
		registry.addConverter(new TenantIdArgumentResolver(tenantRepo));
	}

	@Override
	public void addViewControllers(ViewControllerRegistry registry) {
		registry.addRedirectViewController("/admin", "/admin/").setKeepQueryParams(true)
				.setStatusCode(HttpStatus.PERMANENT_REDIRECT);
	}

	
	//*** Controllers ****/
	
	@Bean
	public DefaultMvcController defaultMvcController() {
		return new DefaultMvcController();
	}
	
	@Bean
	public LoginController defaultLoginController(ApplicationContext context) {
		return new LoginController(context);
	}

	@Bean
	public PluginsApi defaultPluginsApi(SproutModuleRegistrationRepository registrationRepository, ObjectMapper mapper,
			PluginService pluginService) {
		return new PluginsApi(registrationRepository, mapper, pluginService);
	}
	
	@Bean
	public AccountApi defaultAccountApi() {
		return new AccountApi();
	}
	
	@Bean
	public LoginApi defaultLoginApi() {
		return new LoginApi();
	}
	
	@Bean
	public PermissionsApi permissionsApi(RoleRepository roleRepo, PrivilegeRepository privilegeRepo) {
		return new PermissionsApi(roleRepo, privilegeRepo);
	}
	
	@Bean
	@ConditionalOnMissingBean
	public BrandingApi defaultBrandingApi() {
		return new DefaultBrandingApi();
	}
	

}
