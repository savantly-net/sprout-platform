package net.savantly.sprout.domain.file;

import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

import net.savantly.sprout.domain.file.jpa.JpaFileProviderConfiguration;

@Configuration
@Import(JpaFileProviderConfiguration.class)
public class FileProviderConfiguration {

	@Bean
	@ConditionalOnMissingBean
	public FileProviderApi fileProviderApi(FileProvider provider) {
		return new FileProviderApi(provider);
	}
}
