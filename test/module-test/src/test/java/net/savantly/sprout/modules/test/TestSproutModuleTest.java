package net.savantly.sprout.modules.test;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.context.WebApplicationContext;

import net.savantly.sprout.core.module.SimpleSproutModuleExecutionResponse;
import net.savantly.sprout.core.module.SproutModuleConfiguration;
import net.savantly.sprout.core.module.SproutModuleExecutionResponse;
import net.savantly.sprout.core.module.SproutWebModule;

public class TestSproutModuleTest extends SproutModuleTest<TestSproutModuleTest.ExampleModule> {
	
	@Autowired
	WebApplicationContext ctx;

	@Test
	public void test() {
		Assertions.assertTrue(ctx != null);
	}
	
	@Configuration
	static class config {
		@Bean
		ExampleModule exampleModule() {
			return new ExampleModule();
		}
	}
	
	@SproutModuleConfiguration
	static class ExampleModule implements SproutWebModule {
		
		@Override
		public String getName() {
			return "example";
		}

		@Override
		public String getVersion() {
			return "0.0.0";
		}

		@Override
		public SproutModuleExecutionResponse install() {
			return new SimpleSproutModuleExecutionResponse(true, 0, "Install completed");
		}

		@Override
		public SproutModuleExecutionResponse uninstall() {
			return new SimpleSproutModuleExecutionResponse(true, 0, "Uninstall completed");
		}

		@Override
		public String getDescription() {
			return "example module";
		}

		@Override
		public String getId() {
			return "example-module";
		}

		@Override
		public String getPluginInformationMarkup() {
			return "test";
		}


	};
	
}
