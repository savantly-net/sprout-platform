package net.savantly.sprout.autoconfigure;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.AutoConfigureBefore;
import org.springframework.boot.autoconfigure.web.servlet.WebMvcAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.web.servlet.handler.MappedInterceptor;

import net.savantly.sprout.core.domain.tenant.TenantRepository;
import net.savantly.sprout.starter.DateTimeFormatConfiguration;
import net.savantly.sprout.starter.SpringDocConfigurer;
import net.savantly.sprout.starter.freemarker.FreemarkerConfiguration;
import net.savantly.sprout.starter.mvc.SproutWebMvcConfigurer;
import net.savantly.sprout.starter.tenancy.TenantInterceptor;

@Configuration
@AutoConfigureBefore({ WebMvcAutoConfiguration.class, SproutSecurityAutoConfiguration.class })
@Import({ 
	SproutWebMvcConfigurer.class, 
	SpringDocConfigurer.class,
	DateTimeFormatConfiguration.class, 
	FreemarkerConfiguration.class })
public class SproutWebMvcAutoConfiguration implements InitializingBean {

	private static final Logger log = LoggerFactory.getLogger(SproutWebMvcAutoConfiguration.class);

	@Autowired
	TenantRepository tenants;

	@Bean
	public MappedInterceptor myMappedInterceptor() {
		return new MappedInterceptor(new String[] { "/**" }, new TenantInterceptor(tenants));
	}
	
	@Override
	public void afterPropertiesSet() throws Exception {
		// TODO Auto-generated method stub

	}

	/*
	 * @Bean SlowBeans slowBeans() { return new SlowBeans(); }
	 */

	/*
	 * @Bean public static ProgressBeanPostProcessor progressBeanPostProcessor() {
	 * return new ProgressBeanPostProcessor(); }
	 */

}
