package net.savantly.sprout.autoconfigure;

import javax.persistence.EntityManager;
import javax.persistence.metamodel.Type;

import org.springframework.boot.autoconfigure.AutoConfigureBefore;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;

import lombok.RequiredArgsConstructor;
import net.savantly.sprout.autoconfigure.properties.SproutConfigurationProperties;
import net.savantly.sprout.starter.versioning.VersionedObjectBackendIdConverter;

@Configuration
public class SproutRepositoryRestAutoConfiguration {


	@Configuration
	@AutoConfigureBefore(SproutWebMvcAutoConfiguration.class)
	@RequiredArgsConstructor
	static class SproutRepositoryRestConfigurer implements RepositoryRestConfigurer {
		
		private final SproutConfigurationProperties sproutConfiguration;
		private final EntityManager entityManager;

		@Override
		public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
			config.setReturnBodyOnCreate(true);
			config.setReturnBodyForPutAndPost(true);
			config.setBasePath("/api/repo");
			
			config.exposeIdsFor(
	                entityManager.getMetamodel().getEntities().stream()
	                .map(Type::getJavaType)
	                .toArray(Class[]::new));
			
			config.getCorsRegistry().addMapping("/**")
				.allowCredentials(sproutConfiguration.getCors().isAllowCredentials())
				.allowedHeaders(sproutConfiguration.getCors().getAllowedHeaders())
				.allowedMethods(sproutConfiguration.getCors().getAllowedMethods())
				.allowedOrigins(sproutConfiguration.getCors().getAllowedOrigins());
			
		}
		
		@Bean
		public VersionedObjectBackendIdConverter versionedObjectBackendIdConverter() {
			return new VersionedObjectBackendIdConverter();
		}
		
	}

}
