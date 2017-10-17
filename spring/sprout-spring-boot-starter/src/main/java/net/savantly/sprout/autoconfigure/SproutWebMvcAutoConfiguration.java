package net.savantly.sprout.autoconfigure;

import java.io.IOException;

import org.h2.server.web.WebServlet;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.autoconfigure.AutoConfigureBefore;
import org.springframework.boot.autoconfigure.freemarker.FreeMarkerAutoConfiguration;
import org.springframework.boot.web.servlet.ServletRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ResourceLoader;
import org.springframework.web.servlet.view.freemarker.FreeMarkerConfigurer;
import org.springframework.web.servlet.view.freemarker.FreeMarkerViewResolver;

import freemarker.template.TemplateException;
import net.savantly.sprout.bean.processors.ProgressBeanPostProcessor;
import net.savantly.sprout.bean.processors.SlowBeans;
import net.savantly.sprout.content.contentItem.ContentItemRenderer;
import net.savantly.sprout.content.contentItem.ContentItemRestController;
import net.savantly.sprout.content.contentType.ContentTypeTemplateLoader;
import net.savantly.sprout.content.webPage.WebPageRenderer;
import net.savantly.sprout.content.webPage.WebPageRestController;
import net.savantly.sprout.content.webPageLayout.WebPageLayoutTemplateLoader;
import net.savantly.sprout.core.content.contentTemplate.ContentTemplateRepository;
import net.savantly.sprout.core.content.webPageLayout.WebPageLayoutRepository;
import net.savantly.sprout.starter.SproutMvcConfiguration;

@Configuration
@AutoConfigureBefore(FreeMarkerAutoConfiguration.class)
public class SproutWebMvcAutoConfiguration {
	
	private static final Logger log = LoggerFactory.getLogger(SproutWebMvcAutoConfiguration.class);

	@Bean
	public SproutMvcConfiguration sproutMvcAutoConfigurationAdapter(SproutResourceAutoConfiguration  resourcesConfiguration) {
		return new SproutMvcConfiguration(resourcesConfiguration);
	}

	@Bean
	public FreeMarkerViewResolver freemarkerViewResolver() {
		FreeMarkerViewResolver resolver = new FreeMarkerViewResolver();
		resolver.setSuffix(".html");
		return resolver;
	}

	@Bean
	public FreeMarkerConfigurer freemarkerConfigurer(ResourceLoader resourceLoader, SproutResourceAutoConfiguration  resourcesConfiguration) {
		log.info("Creating FreeMarkConfigurer with template loader path: {}", resourcesConfiguration.getWebRoot());
		FreeMarkerConfigurer freeMarkerConfigurer = new FreeMarkerConfigurer();
		freeMarkerConfigurer.setTemplateLoaderPath(resourcesConfiguration.getWebRoot());
		return freeMarkerConfigurer;
	}
	
	@Bean
	public ContentItemRenderer contentItemRenderer(FreeMarkerConfigurer configurer, ContentTypeTemplateLoader loader) throws IOException, TemplateException {
		return new ContentItemRenderer(configurer, loader);
	}
	
	@Bean
	public ContentTypeTemplateLoader contentTypeTemplateLoader(ContentTemplateRepository repository) {
		return new ContentTypeTemplateLoader(repository);
	}

	@Bean
	public ServletRegistrationBean h2servletRegistration() {
		ServletRegistrationBean registrationBean = new ServletRegistrationBean(new WebServlet());
		registrationBean.addUrlMappings("/console/*");
		return registrationBean;
	}
	
	@Bean
	public ContentItemRestController contentItemRestController(ContentItemRenderer renderer) {
		return new ContentItemRestController(renderer);
	}
	
	@Bean
	public WebPageRestController webPageRestController(WebPageRenderer renderer) {
		return new WebPageRestController(renderer);
	}
	
	@Bean
	public WebPageRenderer webPageRenderer(FreeMarkerConfigurer configurer, WebPageLayoutTemplateLoader loader, ContentItemRenderer contentItemRenderer) throws IOException, TemplateException {
		return new WebPageRenderer(configurer, loader, contentItemRenderer);
	}
	
	@Bean
	public WebPageLayoutTemplateLoader webPageLayoutTemplateLoader(WebPageLayoutRepository repository) {
		return new WebPageLayoutTemplateLoader(repository);
	}
	
	@Bean
	SlowBeans slowBeans() {
		return new SlowBeans();
	}

	@Bean
	public static ProgressBeanPostProcessor progressBeanPostProcessor() {
		return new ProgressBeanPostProcessor();
	}

}
