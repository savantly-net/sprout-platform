package net.savantly.sprout.autoconfigure;

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

import net.savantly.sprout.core.domain.tenant.TenantRepository;
import net.savantly.sprout.module.PluginConfiguration;
import net.savantly.sprout.starter.DateTimeFormatConfiguration;
import net.savantly.sprout.starter.SpringDocConfigurer;
import net.savantly.sprout.starter.mvc.SproutWebMvcConfigurer;
import net.savantly.sprout.starter.tenancy.TenantInterceptor;

@Configuration
@AutoConfigureBefore({WebMvcAutoConfiguration.class, SproutSecurityAutoConfiguration.class})
@Import({
	PluginConfiguration.class, 
	SproutWebMvcConfigurer.class, 
	SpringDocConfigurer.class,
	DateTimeFormatConfiguration.class
})
public class SproutWebMvcAutoConfiguration implements InitializingBean {
	
	private static final Logger log = LoggerFactory.getLogger(SproutWebMvcAutoConfiguration.class);
	
	@Autowired
	TenantRepository tenants;
	
	@Bean
	public MappedInterceptor myMappedInterceptor() {
	    return new MappedInterceptor(new String[]{"/**"}, new TenantInterceptor(tenants));
	}
	
	// Also intercepts FreeMarker properties to ensure required paths are included
    @Bean("freeMarkerViewResolver")
    public ViewResolver viewResolver(FreeMarkerProperties freeMarkerProps) {

        FreeMarkerViewResolver resolver = new FreeMarkerViewResolver();
        resolver.setSuffix(".html");
        
		List<String> pathsToAdd = new ArrayList<String>();
		pathsToAdd.add("classpath:/templates");
		pathsToAdd.add("classpath:/META-INF/templates");
		pathsToAdd.add("classpath:/public/");
		pathsToAdd.add("classpath:/static/");
		pathsToAdd.add("classpath:/resources/");
		pathsToAdd.add("classpath:/META-INF/public/");
		pathsToAdd.add("classpath:/META-INF/static/");
		pathsToAdd.add("classpath:/META-INF/resources/");
		String[] paths = freeMarkerProps.getTemplateLoaderPath();
		pathsToAdd.addAll(Arrays.stream(paths).collect(Collectors.toList()));
		
		freeMarkerProps.setTemplateLoaderPath(pathsToAdd.toArray(new String[pathsToAdd.size()]));
		freeMarkerProps.setCheckTemplateLocation(false);
		freeMarkerProps.setSuffix(".html");
		freeMarkerProps.applyToMvcViewResolver(resolver);
        
        return resolver;
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
