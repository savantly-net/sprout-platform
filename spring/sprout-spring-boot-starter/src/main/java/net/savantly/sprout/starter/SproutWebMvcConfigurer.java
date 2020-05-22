package net.savantly.sprout.starter;

import static org.springdoc.core.Constants.CLASSPATH_RESOURCE_LOCATION;
import static org.springdoc.core.Constants.DEFAULT_WEB_JARS_PREFIX_URL;
import static org.springframework.util.AntPathMatcher.DEFAULT_PATH_SEPARATOR;

import org.springdoc.webmvc.ui.SwaggerIndexTransformer;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.format.FormatterRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import lombok.RequiredArgsConstructor;
import net.savantly.sprout.controllers.argument.TenantIdArgumentResolver;
import net.savantly.sprout.core.domain.tenant.TenantRepository;

@Configuration
@ComponentScan(basePackages = "net.savantly.sprout.controllers")
@RequiredArgsConstructor
public class SproutWebMvcConfigurer implements WebMvcConfigurer {
	
	// If the path has a dot, we'll consider it a static file request
	private String staticFilePattern = "*.*";
	private final TenantRepository tenantRepo;
	private final SwaggerIndexTransformer swaggerIndexTransformer;
	
	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		registry.addResourceHandler("/"+staticFilePattern, "/**/"+staticFilePattern)
			.addResourceLocations(
					"classpath:/public/", 
					"classpath:/static/", 
					"classpath:/resources/",
					"classpath:/META-INF/public/", 
					"classpath:/META-INF/static/", 
					"classpath:/META-INF/resources/");
		
		// this should be handled automatically by springdoc, but it doesnt =\
		registry.addResourceHandler("/swagger-ui/**")
				.addResourceLocations(CLASSPATH_RESOURCE_LOCATION + DEFAULT_WEB_JARS_PREFIX_URL + DEFAULT_PATH_SEPARATOR)
				.resourceChain(false)
				.addTransformer(swaggerIndexTransformer);
	}
	
	@Override
	public void addFormatters(FormatterRegistry registry) {
		registry.addConverter(new TenantIdArgumentResolver(tenantRepo));
	}
}
