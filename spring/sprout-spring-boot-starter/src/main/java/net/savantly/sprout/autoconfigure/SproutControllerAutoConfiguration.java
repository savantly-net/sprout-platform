package net.savantly.sprout.autoconfigure;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import net.savantly.sprout.controllers.ClientController;
import net.savantly.sprout.controllers.DefaultMvcController;
import net.savantly.sprout.controllers.LoginController;
import net.savantly.sprout.settings.AppSettingRepository;

@Configuration
public class SproutControllerAutoConfiguration {

	
	@Bean
	public DefaultMvcController defaultMvcController() {
		return new DefaultMvcController();
	}
	
	//@Bean
	public LoginController loginController() {
		return new LoginController();
	}
	
	@Bean
	public ClientController clientController(AppSettingRepository settingsRepository) {
		return new ClientController(settingsRepository);
	}
	
}
