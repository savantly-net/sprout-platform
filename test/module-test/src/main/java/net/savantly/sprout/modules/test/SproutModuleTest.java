package net.savantly.sprout.modules.test;

import org.junit.runner.RunWith;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.web.WebAppConfiguration;

import net.savantly.sprout.SproutAutoConfigure;


@ContextConfiguration
@SpringBootTest
@WebAppConfiguration
@RunWith(SpringRunner.class)
public class SproutModuleTest {
	
	@SpringBootApplication(scanBasePackageClasses= {SproutAutoConfigure.class})
	public static class ModuleTestConfiguration{

	}

}
