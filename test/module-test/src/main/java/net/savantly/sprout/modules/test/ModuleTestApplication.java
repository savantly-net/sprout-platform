package net.savantly.sprout.modules.test;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import net.savantly.sprout.SproutAutoConfiguration;

@SpringBootApplication(scanBasePackageClasses = { SproutAutoConfiguration.class })
public class ModuleTestApplication {

	public static void main(String[] args) {
		SpringApplication.run(ModuleTestApplication.class, args);
	}
}
