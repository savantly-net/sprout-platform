package net.savantly.sprout.settings;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Configuration;
import org.springframework.test.context.junit4.SpringRunner;

import net.savantly.sprout.starter.SchemaConfiguration;

@SpringBootTest
@RunWith(SpringRunner.class)
public class UISettingsTest {

	private static final Logger log = LoggerFactory.getLogger(UISettingsTest.class);

	@Autowired
	UISettings settings;
	@Autowired
	SchemaConfiguration config;
	
	@Test
	public void TestSave() throws Exception {
		String keywords = "one, two, three";
		AppSetting expected = new AppSetting(SettingName.KEYWORDS, keywords);
		AppSetting actual = settings.save(expected);
		Assert.assertEquals("Value should match", expected.getValue(), actual.getValue());
		Assert.assertEquals("Id should match", expected.getId(), actual.getId());
	}
	
	
	@Configuration
	@EnableAutoConfiguration
	static class TestContext {
	}
}
