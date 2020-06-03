package net.savantly.sprout.starter;

import static org.springdoc.core.Constants.CLASSPATH_RESOURCE_LOCATION;
import static org.springdoc.core.Constants.DEFAULT_WEB_JARS_PREFIX_URL;
import static org.springframework.util.AntPathMatcher.DEFAULT_PATH_SEPARATOR;

import java.util.Arrays;

import org.springdoc.webmvc.ui.SwaggerIndexTransformer;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.format.FormatterRegistry;
import org.springframework.format.support.FormattingConversionService;
import org.springframework.util.PathMatcher;
import org.springframework.web.accept.ContentNegotiationManager;
import org.springframework.web.servlet.HandlerMapping;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport;
import org.springframework.web.servlet.handler.AbstractHandlerMapping;
import org.springframework.web.servlet.resource.ResourceUrlProvider;
import org.springframework.web.util.UrlPathHelper;

import lombok.RequiredArgsConstructor;
import net.savantly.sprout.controllers.argument.TenantIdArgumentResolver;
import net.savantly.sprout.core.domain.tenant.TenantRepository;

@Configuration
@ComponentScan(basePackages = "net.savantly.sprout.controllers")
@RequiredArgsConstructor
public class SproutWebMvcConfigurer extends  WebMvcConfigurationSupport {
	
	// If the path has a dot, we'll consider it a static file request
	private String staticFilePattern = "*.*";
	private final TenantRepository tenantRepo;
	private final SwaggerIndexTransformer swaggerIndexTransformer;
	private final String[] resourceLocations = Arrays.asList(
			"classpath:/public/", 
			"classpath:/static/", 
			"classpath:/resources/",
			"classpath:/META-INF/public/", 
			"classpath:/META-INF/static/", 
			"classpath:/META-INF/resources/").toArray(new String[0]);
	
	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {

		// TODO: Why do we need to do this? 
		// We shouldn't need to explicitly add the subfoder and version number to the resource location path
		registry.addResourceHandler("/swagger-ui/**")
				.addResourceLocations(CLASSPATH_RESOURCE_LOCATION + DEFAULT_WEB_JARS_PREFIX_URL + DEFAULT_PATH_SEPARATOR + "swagger-ui/3.25.1/")
				.resourceChain(false)
				.addTransformer(swaggerIndexTransformer);
		
		registry.addResourceHandler("/"+staticFilePattern, "/**/"+staticFilePattern)
			.addResourceLocations(resourceLocations);
		
	}
	
	/**
	 * Set a higher priority on the static resource handler, so annotated controllers don't win
	 */
	@Bean
	@Override
	public HandlerMapping resourceHandlerMapping(
			@Qualifier("mvcUrlPathHelper") UrlPathHelper urlPathHelper,
			@Qualifier("mvcPathMatcher") PathMatcher pathMatcher,
			@Qualifier("mvcContentNegotiationManager") ContentNegotiationManager contentNegotiationManager,
			@Qualifier("mvcConversionService") FormattingConversionService conversionService,
			@Qualifier("mvcResourceUrlProvider") ResourceUrlProvider resourceUrlProvider) {
		HandlerMapping mapping = super.resourceHandlerMapping(urlPathHelper, pathMatcher, contentNegotiationManager, conversionService,
				resourceUrlProvider);
		((AbstractHandlerMapping)mapping).setOrder(-1);
		return mapping;
	}
	
	@Override
	public void addFormatters(FormatterRegistry registry) {
		registry.addConverter(new TenantIdArgumentResolver(tenantRepo));
	}
}
