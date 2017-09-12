package net.savantly.sprout.autoconfigure;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.test.context.junit4.SpringRunner;

import net.savantly.sprout.autoconfigure.controller.DefaultSproutControllerConfiguration;
import net.savantly.sprout.core.SproutControllerConfiguration;

@SpringBootTest
@RunWith(SpringRunner.class)
public class SproutResourceAutoConfigurationTest {
	
	@Autowired
	ApplicationContext ctx;

	@Test
	public void testInitialization(){
		ctx.getBean(SproutResourceAutoConfiguration.class);
	}
	
	@Configuration
	@EnableAutoConfiguration
	static class TestContext{
		@Bean
		SproutControllerConfiguration sproutControllerConfiguration(){
			return new DefaultSproutControllerConfiguration();
		}
	}
}
