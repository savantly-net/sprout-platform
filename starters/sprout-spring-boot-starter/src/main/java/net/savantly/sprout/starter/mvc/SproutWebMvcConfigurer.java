package net.savantly.sprout.starter.mvc;

import java.util.Arrays;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springdoc.webmvc.ui.SwaggerIndexTransformer;
import org.springframework.boot.autoconfigure.ImportAutoConfiguration;
import org.springframework.boot.autoconfigure.web.servlet.WebMvcAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.format.FormatterRegistry;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.PathResourceResolver;
import org.springframework.web.servlet.resource.ResourceResolver;
import org.springframework.web.servlet.resource.WebJarsResourceResolver;

import lombok.RequiredArgsConstructor;
import net.savantly.sprout.autoconfigure.properties.SproutConfigurationProperties;
import net.savantly.sprout.controllers.argument.TenantIdArgumentResolver;
import net.savantly.sprout.core.domain.tenant.TenantRepository;

@Configuration
@ComponentScan(basePackages = "net.savantly.sprout.controllers")
@ImportAutoConfiguration({WebMvcAutoConfiguration.class})
@RequiredArgsConstructor
public class SproutWebMvcConfigurer implements WebMvcConfigurer {
	
	private static final Logger log = LoggerFactory.getLogger(SproutWebMvcConfigurer.class);
	private static final String CLASSPATH_RESOURCE_LOCATION = "classpath:/META-INF/resources";
	private static final String DEFAULT_WEB_JARS_PREFIX_URL = "/webjars";
	private static final String DEFAULT_PATH_SEPARATOR = "/";
	
	// These paths will be handled by the PathResourceHandler
	private static final String[] staticResourcesPatterns = Arrays.asList(
			"/*.*",
			"/**/*.*").toArray(new String[0]);
	
	private static final String[] resourceLocations = Arrays.asList(
			"/",
			"/assets/",
			"classpath:/public/", 
			"classpath:/static/", 
			"classpath:/resources/",
			"classpath:/META-INF/public/", 
			"classpath:/META-INF/static/", 
			CLASSPATH_RESOURCE_LOCATION + DEFAULT_PATH_SEPARATOR).toArray(new String[0]);

	private final String webjarLocation = CLASSPATH_RESOURCE_LOCATION + DEFAULT_WEB_JARS_PREFIX_URL + DEFAULT_PATH_SEPARATOR;

	private final TenantRepository tenantRepo;
	private final SwaggerIndexTransformer swaggerIndexTransformer;
	private final RepositoryRestConfiguration repositoryRestConfiguration;
	
	private final SproutConfigurationProperties sproutConfiguration;
	
	
	//@Override
	public void offaddResourceHandlers(ResourceHandlerRegistry registry) {

		ResourceResolver webjarsResolver = new WebJarsResourceResolver();
		ResourceResolver pathResolver = new PathResourceResolver();
		
		// Swagger UI
		registry.addResourceHandler("/**/swagger-ui/**")
			.addResourceLocations(webjarLocation)
			.resourceChain(false)
			.addResolver(webjarsResolver)
			.addResolver(pathResolver)
			.addTransformer(swaggerIndexTransformer);
		
		// HAL Explorer
		String basePath = repositoryRestConfiguration.getBasePath().toString().concat("/explorer");
		String rootLocation = "classpath:META-INF/spring-data-rest/hal-explorer/";
		registry.addResourceHandler(basePath.concat("/**")).addResourceLocations(rootLocation);

		// Static resources
		registry.addResourceHandler(staticResourcesPatterns)
			.addResourceLocations(resourceLocations);
		
		// Admin app resources
		registry.addResourceHandler("/admin/*.*", "/admin/**/*.*")
			.addResourceLocations(
					"classpath:/public/admin/",
					"classpath:/static/admin/",
					"classpath:/resources/admin/",
					"classpath:/META-INF/public/admin/",
					"classpath:/META-INF/static/admin/",
					"classpath:/META-INF/resources/admin/");
		
		// Additional static mappings
		this.sproutConfiguration.getMvc().getStaticResources().stream().forEach(r -> {
			registry.addResourceHandler(r.getPatterns().toArray(new String[0]))
			.addResourceLocations(r.getLocations().toArray(new String[0]));
		});
		
		for (String pathPattern : staticResourcesPatterns) {
			assertResourcePattern(registry, pathPattern);
		}
	}
	
	private void assertResourcePattern(ResourceHandlerRegistry registry, String pathPattern) {
		if(registry.hasMappingForPattern(pathPattern)) {
			log.info(String.format("resource pattern IS set: %s", pathPattern));
		} else {
			log.info(String.format("resource pattern NOT set: %s", pathPattern));
		}
	}

	/**
	 * Set a higher priority on the static resource handler, so annotated controllers don't win
	 */
	/*
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
	*/
	
	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**")
			.allowCredentials(sproutConfiguration.getCors().isAllowCredentials())
			.allowedHeaders(sproutConfiguration.getCors().getAllowedHeaders())
			.allowedMethods(sproutConfiguration.getCors().getAllowedMethods())
			.allowedOrigins(sproutConfiguration.getCors().getAllowedOrigins());
	}

	
	@Override
	public void addFormatters(FormatterRegistry registry) {
		registry.addConverter(new TenantIdArgumentResolver(tenantRepo));
	}

}
