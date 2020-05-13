package net.savantly.sprout.modules.test;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = { "net.savantly.sprout.autoconfigure" })
public class ModuleTestApplication {

	public static void main(String[] args) {
		SpringApplication.run(ModuleTestApplication.class, args);
	}
}
