package net.savantly.sprout.domain.folder;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FolderConfiguration {

	@Bean
	public FolderApi folderApi(FolderService service) {
		return new FolderApi(service);
	}
	
	@Bean
	public FolderService folderService(FolderRepository repo) {
		return new FolderService(repo);
	}
}
