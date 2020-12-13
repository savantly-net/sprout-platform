package net.savantly.sprout.domain.file.jpa;

import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import net.savantly.sprout.domain.file.FileProvider;

/**
 * The default file provider
 * 
 * @author jeremybranham
 *
 */
@Configuration
@ConditionalOnProperty(prefix = "sprout.files", name = "provider-name", havingValue = "jpaFileProvider", matchIfMissing = true)
public class JpaFileProviderConfiguration {

	@Bean
	public FileProvider jpaFileProvider(JpaFileRepository repository) {
		return new JpaFileProvider(repository);
	}

	@Bean
	public JpaFileApi jpaFileApi(JpaFileProvider provider) {
		return new JpaFileApi(provider);
	}
}
