package net.savantly.sprout.autoconfigure;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.context.annotation.Import;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import net.savantly.sprout.starter.JpaConfiguration;
import net.savantly.sprout.starter.SproutAuditConfiguration;


@Configuration
@EntityScan
@EnableTransactionManagement
@Import({
	JpaConfiguration.class,
	SproutAuditConfiguration.class
})
@EnableAspectJAutoProxy
@ConfigurationPropertiesScan
public class SproutAutoConfiguration {


}
