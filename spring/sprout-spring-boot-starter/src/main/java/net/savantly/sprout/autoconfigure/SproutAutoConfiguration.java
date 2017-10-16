package net.savantly.sprout.autoconfigure;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.autoconfigure.jackson.Jackson2ObjectMapperBuilderCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import com.fasterxml.jackson.databind.module.SimpleModule;

import net.savantly.sprout.core.content.contentField.ContentField;
import net.savantly.sprout.core.content.contentField.ContentFieldKeyDeserializer;
import net.savantly.sprout.core.content.contentField.ContentFieldRepository;


@Configuration
@EnableJpaRepositories
@EntityScan
@EnableTransactionManagement
public class SproutAutoConfiguration {
	
	@Bean
	public Jackson2ObjectMapperBuilderCustomizer objectMapperCustomizer(ContentFieldRepository repository) {
		Jackson2ObjectMapperBuilderCustomizer customizer = new Jackson2ObjectMapperBuilderCustomizer() {

			@Override
			public void customize(Jackson2ObjectMapperBuilder jacksonObjectMapperBuilder) {
				
				SimpleModule customModule = new SimpleModule();
				customModule.addKeyDeserializer(ContentField.class, new ContentFieldKeyDeserializer(repository));
				
				jacksonObjectMapperBuilder.modulesToInstall(customModule);
			}
		};
		return customizer;
	}

}
