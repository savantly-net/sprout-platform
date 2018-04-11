package net.savantly.sprout.autoconfigure;

import org.springframework.boot.autoconfigure.jackson.Jackson2ObjectMapperBuilderCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.context.annotation.Import;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import com.fasterxml.jackson.databind.module.SimpleModule;

import net.savantly.sprout.core.content.contentField.ContentField;
import net.savantly.sprout.core.content.contentField.ContentFieldKeyDeserializer;
import net.savantly.sprout.core.content.contentField.ContentFieldRepository;
import net.savantly.sprout.core.content.contentItem.ContentItem;
import net.savantly.sprout.core.content.contentItem.ContentItemKeyDeserializer;
import net.savantly.sprout.core.content.contentItem.ContentItemRepository;
import net.savantly.sprout.starter.JpaConfiguration;


@Configuration
@EnableTransactionManagement
@Import({JpaConfiguration.class})
@EnableAspectJAutoProxy
public class SproutAutoConfiguration {

	@Bean
	public Jackson2ObjectMapperBuilderCustomizer objectMapperCustomizer(ContentFieldRepository repository, ContentItemRepository contentItemRepository) {
		Jackson2ObjectMapperBuilderCustomizer customizer = new MapperCustomizer(repository, contentItemRepository);
		return customizer;
	}
	
	protected class MapperCustomizer implements Jackson2ObjectMapperBuilderCustomizer {
		
		private ContentFieldRepository contentFieldrepository;
		private ContentItemRepository contentItemRepository;

		
		public MapperCustomizer(ContentFieldRepository contentFieldrepository,
				ContentItemRepository contentItemRepository) {
			super();
			this.contentFieldrepository = contentFieldrepository;
			this.contentItemRepository = contentItemRepository;
		}

		@Override
		public void customize(Jackson2ObjectMapperBuilder jacksonObjectMapperBuilder) {
			
			SimpleModule customModule = new SimpleModule();
			customModule.addKeyDeserializer(ContentField.class, new ContentFieldKeyDeserializer(contentFieldrepository));
			customModule.addKeyDeserializer(ContentItem.class, new ContentItemKeyDeserializer(contentItemRepository));
			
			jacksonObjectMapperBuilder.modulesToInstall(customModule);
		}
	}

}
