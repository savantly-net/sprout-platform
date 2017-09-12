package net.savantly.sprout.core.configuration;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
@ConfigurationProperties("net.savantly.sprout.core")
@EnableJpaRepositories
@EntityScan
@ComponentScan("net.savantly.sprout.core")
public class CoreConfiguration {
	public static final long serialVersionUID = 1L;
}
