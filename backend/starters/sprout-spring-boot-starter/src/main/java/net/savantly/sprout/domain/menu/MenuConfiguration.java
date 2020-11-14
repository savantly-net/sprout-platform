package net.savantly.sprout.domain.menu;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import net.savantly.sprout.core.domain.menu.MenuRepository;

@Configuration
public class MenuConfiguration {
	
	@Bean
	public MenuFixture defaultMenuFixture(MenuRepository repository) {
		return new MenuFixture(repository);
	}

	@Bean
	public MenuApi defaultMenuApi() {
		return new MenuApi();
	}
	
	@Bean
	public MenuService defaultMenuService(MenuRepository repository) {
		return new MenuService(repository);
	}
}
