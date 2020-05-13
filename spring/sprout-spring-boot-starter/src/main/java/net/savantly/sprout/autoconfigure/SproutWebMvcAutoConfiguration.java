package net.savantly.sprout.autoconfigure;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.AutoConfigureBefore;
import org.springframework.boot.autoconfigure.freemarker.FreeMarkerProperties;
import org.springframework.boot.autoconfigure.web.servlet.WebMvcAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.handler.MappedInterceptor;
import org.springframework.web.servlet.view.freemarker.FreeMarkerViewResolver;

import freemarker.template.TemplateException;
import net.savantly.sprout.content.contentItem.ContentItemFreemarkerRenderer;
import net.savantly.sprout.content.contentItem.ContentItemRenderer;
import net.savantly.sprout.content.contentItem.ContentItemRenderingChain;
import net.savantly.sprout.content.contentItem.ContentItemRestController;
import net.savantly.sprout.content.contentType.ContentTypeTemplateLoader;
import net.savantly.sprout.content.webPage.WebPageRenderer;
import net.savantly.sprout.content.webPage.WebPageRestController;
import net.savantly.sprout.content.webPageLayout.WebPageLayoutTemplateLoader;
import net.savantly.sprout.controllers.ClientController;
import net.savantly.sprout.controllers.DefaultMvcController;
import net.savantly.sprout.controllers.LoginController;
import net.savantly.sprout.controllers.ProvisioningController;
import net.savantly.sprout.core.content.contentTemplate.ContentTemplateRepository;
import net.savantly.sprout.core.content.webPage.WebPageRepository;
import net.savantly.sprout.core.content.webPageLayout.WebPageLayoutRepository;
import net.savantly.sprout.core.domain.tenant.TenantRepository;
import net.savantly.sprout.module.PluginConfiguration;
import net.savantly.sprout.settings.AppSettingRepository;
import net.savantly.sprout.settings.UISettings;
import net.savantly.sprout.starter.SproutMvcConfiguration;
import net.savantly.sprout.tenancy.TenantInterceptor;

@Configuration
@AutoConfigureBefore(WebMvcAutoConfiguration.class)
@Import(PluginConfiguration.class)
public class SproutWebMvcAutoConfiguration implements InitializingBean {
	
	private static final Logger log = LoggerFactory.getLogger(SproutWebMvcAutoConfiguration.class);
	
	@Autowired
	TenantRepository tenants;

	@Bean
	public UISettings uiSettings(AppSettingRepository appSettings) {
		return new UISettings(appSettings);
	}

	@Bean
	public SproutMvcConfiguration sproutMvcAutoConfigurationAdapter() {
		return new SproutMvcConfiguration();
	}
	
	@Bean
	public MappedInterceptor myMappedInterceptor() {
	    return new MappedInterceptor(new String[]{"/**"}, new TenantInterceptor(tenants));
	}
	
	@Bean
	public DefaultMvcController defaultMvcController() {
		return new DefaultMvcController();
	}
	
	@Bean
	public LoginController loginController() {
		return new LoginController();
	}
	
	@Bean
	public ClientController clientController(AppSettingRepository settingsRepository) {
		return new ClientController(settingsRepository);
	}
	
	@Bean
	public ProvisioningController provisioningController() {
		return new ProvisioningController();
	}
	
	// Also intercepts FreeMarker properties to ensure required paths are included
    @Bean("freeMarkerViewResolver")
    public ViewResolver viewResolver(FreeMarkerProperties freeMarkerProps) {
		final String path1 = "classpath:/META-INF/templates";
		final String path2 = "classpath:/templates";
		List<String> pathsToAdd = new ArrayList<String>();
		pathsToAdd.add(path1);
		pathsToAdd.add(path2);
		String[] paths = freeMarkerProps.getTemplateLoaderPath();
		pathsToAdd.addAll(Arrays.stream(paths).collect(Collectors.toList()));
		
		freeMarkerProps.setTemplateLoaderPath(pathsToAdd.toArray(new String[pathsToAdd.size()]));
		freeMarkerProps.setCheckTemplateLocation(false);
		freeMarkerProps.setSuffix(".html");
		
        FreeMarkerViewResolver resolver = new FreeMarkerViewResolver();
        resolver.setSuffix(".html");
        return resolver;
    }
    
    @Bean
    public ContentItemRenderingChain contentItemRenderingChain() {
    	return new ContentItemRenderingChain();
    }
		
	@Bean
	public ContentItemRenderer defaultContentItemRenderer(ContentTemplateRepository repository) throws IOException, TemplateException {
		ContentTypeTemplateLoader loader = new ContentTypeTemplateLoader(repository);
		return new ContentItemFreemarkerRenderer(loader);
	}
	
	@Bean
	public ContentItemRestController contentItemRestController(ContentItemRenderingChain renderer) {
		return new ContentItemRestController(renderer);
	}
	
	@Bean
	public WebPageRestController webPageRestController(WebPageRenderer renderer, WebPageRepository repository) {
		return new WebPageRestController(renderer, repository);
	}
	
	@Bean
	public WebPageRenderer webPageRenderer(ContentItemRenderingChain contentItemRenderer, WebPageLayoutRepository webPageLayoutRepository) throws IOException, TemplateException {
		WebPageLayoutTemplateLoader loader = new WebPageLayoutTemplateLoader(webPageLayoutRepository);
		return new WebPageRenderer(loader, contentItemRenderer);
	}

	@Override
	public void afterPropertiesSet() throws Exception {
		// TODO Auto-generated method stub
		
	}
	
	
/*	@Bean
	SlowBeans slowBeans() {
		return new SlowBeans();
	}*/

/*	@Bean
	public static ProgressBeanPostProcessor progressBeanPostProcessor() {
		return new ProgressBeanPostProcessor();
	}*/

}
