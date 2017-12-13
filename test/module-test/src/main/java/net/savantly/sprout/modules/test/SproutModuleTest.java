package net.savantly.sprout.modules.test;

import org.junit.runner.RunWith;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Configuration;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.web.WebAppConfiguration;

import net.savantly.sprout.core.module.SproutModule;


@ContextConfiguration
@SpringBootTest
@WebAppConfiguration
@RunWith(SpringRunner.class)
public class SproutModuleTest<T extends SproutModule> {
	
	@Configuration
	@EnableAutoConfiguration
	static class TestContext {

	}

}
