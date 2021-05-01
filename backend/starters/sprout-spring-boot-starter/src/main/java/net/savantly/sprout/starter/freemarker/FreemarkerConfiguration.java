package net.savantly.sprout.starter.freemarker;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.boot.autoconfigure.freemarker.FreeMarkerProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.view.freemarker.FreeMarkerConfigurer;
import org.springframework.web.servlet.view.freemarker.FreeMarkerViewResolver;

import net.savantly.sprout.starter.template.TemplateRenderer;

@Configuration
public class FreemarkerConfiguration {
	

	private final List<String> defaultTemplatePaths = new ArrayList<String>();
	{
		defaultTemplatePaths.add("classpath:/templates");
		defaultTemplatePaths.add("classpath:/META-INF/templates");
		defaultTemplatePaths.add("classpath:/public/");
		defaultTemplatePaths.add("classpath:/static/");
		defaultTemplatePaths.add("classpath:/resources/");
		defaultTemplatePaths.add("classpath:/META-INF/public/");
		defaultTemplatePaths.add("classpath:/META-INF/static/");
		defaultTemplatePaths.add("classpath:/META-INF/resources/");
	}
	
	@Bean
	FreeMarkerConfigurer defaultFreeMarkerConfigurer(FreeMarkerProperties freeMarkerProps) {
		FreeMarkerConfigurer configurer = new FreeMarkerConfigurer();

		String[] paths = freeMarkerProps.getTemplateLoaderPath();
		List<String> pathsToAdd = new ArrayList<String>();
		pathsToAdd.addAll(defaultTemplatePaths);
		pathsToAdd.addAll(Arrays.stream(paths).collect(Collectors.toList()));
		
		configurer.setTemplateLoaderPaths(pathsToAdd.toArray(new String[pathsToAdd.size()]));
		
		return configurer;
	}

	// Also intercepts FreeMarker properties to ensure required paths are included
	@Bean("freeMarkerViewResolver")
	public ViewResolver viewResolver(FreeMarkerProperties freeMarkerProps) {

		FreeMarkerViewResolver resolver = new FreeMarkerViewResolver();
		resolver.setSuffix(".html");

		String[] paths = freeMarkerProps.getTemplateLoaderPath();
		List<String> pathsToAdd = new ArrayList<String>();
		pathsToAdd.addAll(defaultTemplatePaths);
		pathsToAdd.addAll(Arrays.stream(paths).collect(Collectors.toList()));

		freeMarkerProps.setTemplateLoaderPath(pathsToAdd.toArray(new String[pathsToAdd.size()]));
		freeMarkerProps.setCheckTemplateLocation(false);
		freeMarkerProps.setSuffix(".html");
		freeMarkerProps.applyToMvcViewResolver(resolver);

		return resolver;
	}
	

	@Bean
	@Primary
	public TemplateRenderer defaultTemplateRenderer(freemarker.template.Configuration freemarkerConfiguration) {
		return new FreemarkerRenderer(freemarkerConfiguration);
	}
}
