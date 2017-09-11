package net.savantly.sprout.modules.test;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import net.savantly.sprout.SproutAutoConfigure;

@SpringBootApplication(scanBasePackageClasses = { SproutAutoConfigure.class })
public class ModuleTestApplication {

	public static void main(String[] args) {
		SpringApplication.run(ModuleTestApplication.class, args);
	}
}
