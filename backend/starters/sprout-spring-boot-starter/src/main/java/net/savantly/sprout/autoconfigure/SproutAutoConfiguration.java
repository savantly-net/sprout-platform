package net.savantly.sprout.autoconfigure;

import org.springframework.boot.context.properties.ConfigurationPropertiesScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.context.annotation.Import;

import net.savantly.sprout.domain.DomainConfiguration;
import net.savantly.sprout.module.ModuleConfiguration;
import net.savantly.sprout.starter.JpaConfiguration;
import net.savantly.sprout.starter.SproutAuditConfiguration;
import net.savantly.sprout.starter.jms.JmsConfiguration;



@Configuration
@Import({
	DomainConfiguration.class,
	JmsConfiguration.class,
	JpaConfiguration.class,
	SproutAuditConfiguration.class,
	ModuleConfiguration.class
})
@EnableAspectJAutoProxy
@ConfigurationPropertiesScan
public class SproutAutoConfiguration {


}
