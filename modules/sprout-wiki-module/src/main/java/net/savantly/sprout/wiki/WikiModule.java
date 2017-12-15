package net.savantly.sprout.wiki;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import net.savantly.sprout.core.module.SimpleSproutModuleExecutionResponse;
import net.savantly.sprout.core.module.SproutModuleAdapter;
import net.savantly.sprout.core.module.SproutModuleConfiguration;
import net.savantly.sprout.core.module.SproutModuleExecutionResponse;
import net.savantly.sprout.wiki.repository.WikiItemRepository;

@EntityScan
@Configuration(WikiModule.BEAN_NAME)
@ComponentScan
@EnableJpaRepositories(basePackageClasses=WikiItemRepository.class)
@SproutModuleConfiguration("SproutWikiModule")
public class WikiModule extends SproutModuleAdapter {
	
	public static final String BEAN_NAME = "wikiModule";
	
	private static final Logger log = LoggerFactory.getLogger(WikiModule.class);
	private static final String VERSION = "0.0.1";
	private static final String NAME = "sprout-wiki";
	private static final String PATH = "/rest/modules/sprout-wiki/";
	private static final String DESCRIPTION = "A simple wiki module for the Sprout platform.";
	
	@Autowired
	WikiFixture fixture;

	public WikiModule() {
		log.info("Instantiated WikiModule");
	}

	@Override
	public String getName() {
		return NAME;
	}

	@Override
	public String getWelcomeUrl() {
		return PATH;
	}
	
	@Override
	public String getVersion() {
		return VERSION;
	}

	@Override
	public String getDescription() {
		return DESCRIPTION;
	}

	@Override
	public SproutModuleExecutionResponse install() {
		try {
			fixture.install();
			return new SimpleSproutModuleExecutionResponse(true, 0, "Install completed");
		} catch (Exception e) {
			return new SimpleSproutModuleExecutionResponse(false, 1, e.getMessage());
		}
	}

	@Override
	public SproutModuleExecutionResponse uninstall() {
		try {
			fixture.uninstall();
			return new SimpleSproutModuleExecutionResponse(true, 0, "Uninstall completed");
		} catch (Exception e) {
			return new SimpleSproutModuleExecutionResponse(false, 1, e.getMessage());
		}
	}

}
