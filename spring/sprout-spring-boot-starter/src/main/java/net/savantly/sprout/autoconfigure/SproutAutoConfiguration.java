package net.savantly.sprout.autoconfigure;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;


@Configuration
@EnableJpaRepositories
@EntityScan
public class SproutAutoConfiguration {
	

}
