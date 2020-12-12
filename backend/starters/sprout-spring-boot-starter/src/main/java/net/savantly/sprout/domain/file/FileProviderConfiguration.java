package net.savantly.sprout.domain.file;

import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import net.savantly.sprout.domain.file.jpa.JpaFileProvider;
import net.savantly.sprout.domain.file.jpa.JpaFileRepository;

@Configuration
public class FileProviderConfiguration {

	@Bean
	@ConditionalOnMissingBean
	public FileProvider jpaFileProvider(JpaFileRepository repository) {
		return new JpaFileProvider(repository);
	}
	
	@Bean
	@ConditionalOnMissingBean
	public FileProviderApi fileProviderApi(FileProvider provider) {
		return new FileProviderApi(provider);
	}
}
