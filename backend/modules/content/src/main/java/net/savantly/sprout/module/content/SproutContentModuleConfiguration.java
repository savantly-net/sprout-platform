package net.savantly.sprout.module.content;

import java.io.IOException;

import org.springframework.boot.autoconfigure.jackson.Jackson2ObjectMapperBuilderCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;

import com.fasterxml.jackson.databind.module.SimpleModule;

import freemarker.template.TemplateException;
import net.savantly.sprout.core.module.SproutModuleConfiguration;
import net.savantly.sprout.module.content.model.contentField.ContentFieldImpl;
import net.savantly.sprout.module.content.model.contentField.ContentFieldKeyDeserializer;
import net.savantly.sprout.module.content.model.contentField.ContentFieldRepository;
import net.savantly.sprout.module.content.model.contentItem.ContentItemImpl;
import net.savantly.sprout.module.content.model.contentItem.ContentItemFreemarkerRenderer;
import net.savantly.sprout.module.content.model.contentItem.ContentItemKeyDeserializer;
import net.savantly.sprout.module.content.model.contentItem.ContentItemRenderer;
import net.savantly.sprout.module.content.model.contentItem.ContentItemRenderingChain;
import net.savantly.sprout.module.content.model.contentItem.ContentItemRepository;
import net.savantly.sprout.module.content.model.contentTemplate.ContentTemplateImpl;
import net.savantly.sprout.module.content.model.contentTemplate.ContentTemplateFixture;
import net.savantly.sprout.module.content.model.contentTemplate.ContentTemplateRepository;
import net.savantly.sprout.module.content.model.contentType.ContentTypeImpl;
import net.savantly.sprout.module.content.model.contentType.ContentTypeFixture;
import net.savantly.sprout.module.content.model.contentType.ContentTypeRepository;
import net.savantly.sprout.module.content.model.contentType.ContentTypeTemplateLoader;
import net.savantly.sprout.module.content.model.webPage.WebPage;
import net.savantly.sprout.module.content.model.webPage.WebPageFixture;
import net.savantly.sprout.module.content.model.webPage.WebPageRenderer;
import net.savantly.sprout.module.content.model.webPage.WebPageRepository;
import net.savantly.sprout.module.content.model.webPageContent.WebPageContent;
import net.savantly.sprout.module.content.model.webPageLayout.WebPageLayout;
import net.savantly.sprout.module.content.model.webPageLayout.WebPageLayoutFixture;
import net.savantly.sprout.module.content.model.webPageLayout.WebPageLayoutRepository;
import net.savantly.sprout.module.content.model.webPageLayout.WebPageLayoutTemplateLoader;

@SproutModuleConfiguration
public class SproutContentModuleConfiguration {

	@Bean
	public ContentApi contentApi(ContentItemRenderingChain itemRenderer, WebPageRenderer pageRenderer, 
			WebPageRepository pageRepository, ContentItemRepository contentItemRepository) {
		return new ContentApi(itemRenderer, pageRenderer, pageRepository, contentItemRepository);
	}
	
	@Bean
	public ContentController contentController() {
		return new ContentController();
	}
	
	@Bean
	public WebPageLayoutFixture webPageLayoutFixture(WebPageLayoutRepository repository) {
		return new WebPageLayoutFixture(repository);
	}
	
	@Bean
	public WebPageFixture webPageFixture(
			WebPageRepository wpRepository, 
			WebPageLayoutRepository wplRepository, 
			WebPageLayoutFixture wplFixture) {
		return new WebPageFixture(wpRepository, wplRepository, wplFixture);
	}
	
	@Bean 
	public ContentTypeFixture contentTypeFixture(ContentTypeRepository repository) {
		return new ContentTypeFixture(repository);
	}
	
	@Bean
	public ContentTemplateFixture contentTemplateFixture(ContentTemplateRepository templateRepository) {
		return new ContentTemplateFixture(templateRepository);
	}

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
			customModule.addKeyDeserializer(ContentFieldImpl.class, new ContentFieldKeyDeserializer(contentFieldrepository));
			customModule.addKeyDeserializer(ContentItemImpl.class, new ContentItemKeyDeserializer(contentItemRepository));
			
			jacksonObjectMapperBuilder.modulesToInstall(customModule);
		}
	}
	
    
    @Bean
    public ContentItemRenderingChain contentItemRenderingChain() {
    	return new ContentItemRenderingChain();
    }
		
	@Bean
	public ContentItemRenderer defaultContentItemRenderer(ContentTemplateRepository repository, ContentFieldRepository contentFieldRepository) throws IOException, TemplateException {
		ContentTypeTemplateLoader loader = new ContentTypeTemplateLoader(repository);
		return new ContentItemFreemarkerRenderer(loader, contentFieldRepository);
	}
	
	
	@Bean
	public WebPageRenderer webPageRenderer(ContentItemRenderingChain contentItemRenderer, WebPageLayoutRepository webPageLayoutRepository) throws IOException, TemplateException {
		WebPageLayoutTemplateLoader loader = new WebPageLayoutTemplateLoader(webPageLayoutRepository);
		return new WebPageRenderer(loader, contentItemRenderer);
	}
	
	@Configuration
	static class SproutRepositoryRestConfigurer implements RepositoryRestConfigurer {

		@Override
		public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
			config.exposeIdsFor(
				ContentTemplateImpl.class, 
				ContentTypeImpl.class, 
				ContentItemImpl.class, 
				ContentFieldImpl.class,
				WebPage.class, 
				WebPageLayout.class,
				WebPageContent.class);
		}
	}
}
