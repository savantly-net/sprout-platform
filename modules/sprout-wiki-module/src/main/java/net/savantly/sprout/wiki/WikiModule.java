package net.savantly.sprout.wiki;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import net.savantly.sprout.core.module.SproutModule;
import net.savantly.sprout.wiki.repository.WikiItemRepository;

@EntityScan
@EnableJpaRepositories(basePackageClasses=WikiItemRepository.class)
@SproutModule(value="sprout-wiki", bundleJs="modules/sprout-wiki/dist/sprout-wiki.bundle.js")
public class WikiModule {

}
