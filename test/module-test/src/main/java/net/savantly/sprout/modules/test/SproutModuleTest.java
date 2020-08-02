package net.savantly.sprout.modules.test;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.web.context.WebApplicationContext;

import net.savantly.sprout.core.module.SproutModule;

@SpringBootTest
public class SproutModuleTest<T extends SproutModule> {

	@Autowired
	WebApplicationContext ctx;
	@Autowired
	T module;
	
	@Test
	public void testContextLoads() {
		Assertions.assertTrue(ctx != null);
	}
	
	@Test
	public void testModuleInstallation() {
		module.install();
		module.uninstall();
	}
	
	@Test
	public void propertiesSmokeTest() {
		module.getClass();
		module.getDescription();
		module.getKey();
		module.getName();
		module.getVersion();
	}
}
