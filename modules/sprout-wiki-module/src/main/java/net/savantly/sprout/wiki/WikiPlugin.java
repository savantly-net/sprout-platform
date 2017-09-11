package net.savantly.sprout.wiki;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import net.savantly.sprout.core.plugin.SproutPlugin;
import net.savantly.sprout.wiki.repository.WikiItemRepository;

@SproutPlugin("Wiki")
@EntityScan
@EnableJpaRepositories(basePackageClasses=WikiItemRepository.class)
public class WikiPlugin {

}
