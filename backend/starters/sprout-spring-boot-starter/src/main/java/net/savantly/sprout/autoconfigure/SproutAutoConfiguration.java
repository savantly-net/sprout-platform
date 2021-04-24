package net.savantly.sprout.autoconfigure;

import org.springframework.boot.context.properties.ConfigurationPropertiesScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.context.annotation.Import;

import net.savantly.sprout.module.ModuleConfiguration;
import net.savantly.sprout.starter.JpaConfiguration;
import net.savantly.sprout.starter.SproutAuditConfiguration;
import net.savantly.sprout.starter.tenancy.TenancyConfiguration;


@Configuration
@Import({
	JpaConfiguration.class,
	SproutAuditConfiguration.class,
	TenancyConfiguration.class,
	ModuleConfiguration.class
})
@EnableAspectJAutoProxy
@ConfigurationPropertiesScan
public class SproutAutoConfiguration {


}
