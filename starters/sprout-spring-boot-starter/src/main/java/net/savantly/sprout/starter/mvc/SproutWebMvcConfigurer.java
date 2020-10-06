package net.savantly.sprout.starter.mvc;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.autoconfigure.ImportAutoConfiguration;
import org.springframework.boot.autoconfigure.web.servlet.WebMvcAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.format.FormatterRegistry;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import lombok.RequiredArgsConstructor;
import net.savantly.sprout.autoconfigure.properties.SproutConfigurationProperties;
import net.savantly.sprout.controllers.argument.TenantIdArgumentResolver;
import net.savantly.sprout.core.domain.tenant.TenantRepository;

@Configuration
@ComponentScan(basePackages = {"net.savantly.sprout.controllers", "net.savantly.sprout.domain"})
@ImportAutoConfiguration({WebMvcAutoConfiguration.class})
@RequiredArgsConstructor
public class SproutWebMvcConfigurer implements WebMvcConfigurer {
	
	private static final Logger log = LoggerFactory.getLogger(SproutWebMvcConfigurer.class);

	private final TenantRepository tenantRepo;
	
	private final SproutConfigurationProperties sproutConfiguration;
	
	@Override
	public void addCorsMappings(CorsRegistry registry) {
		log.info("adding CORS mapping for web mvc");
		registry.addMapping("/**")
			.allowCredentials(sproutConfiguration.getCors().isAllowCredentials())
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
		registry.addRedirectViewController("/admin", "/admin/")
	      .setKeepQueryParams(true)
	      .setStatusCode(HttpStatus.PERMANENT_REDIRECT);
	}

}
