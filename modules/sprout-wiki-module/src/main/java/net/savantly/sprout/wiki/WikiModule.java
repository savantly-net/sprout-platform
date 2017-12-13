package net.savantly.sprout.wiki;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import net.savantly.sprout.core.module.SproutModuleAdapter;
import net.savantly.sprout.core.module.SproutModuleConfiguration;
import net.savantly.sprout.wiki.repository.WikiItemRepository;

@EntityScan
@Configuration
@ComponentScan(basePackageClasses= {WikiModule.class})
@EnableJpaRepositories(basePackageClasses=WikiItemRepository.class)
@SproutModuleConfiguration("sprout-wiki")
public class WikiModule extends SproutModuleAdapter {

	private static final String NAME = "sprout-wiki";
	private static final String PATH = "/rest/modules/sprout-wiki";

	@Override
	public String name() {
		return NAME;
	}

	@Override
	public String renderUrl() {
		return PATH;
	}
}
