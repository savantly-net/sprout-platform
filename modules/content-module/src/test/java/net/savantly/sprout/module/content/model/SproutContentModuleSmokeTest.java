package net.savantly.sprout.module.content.model;

import javax.transaction.Transactional;

import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.web.WebAppConfiguration;

import net.savantly.sprout.module.content.SproutContentModule;
import net.savantly.sprout.modules.test.ModuleTestApplication;
import net.savantly.sprout.modules.test.SproutModuleTest;

@SpringBootTest
@WebAppConfiguration
@Transactional
public class SproutContentModuleSmokeTest extends SproutModuleTest<SproutContentModule> {

	@Configuration
	@Import({SproutContentModule.class, ModuleTestApplication.class})
	static class TestContext{
		
	}
}
