package net.savantly.sprout.settings;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Configuration;

@SpringBootTest
public class UISettingsTest {

	private static final Logger log = LoggerFactory.getLogger(UISettingsTest.class);

	@Autowired
	UISettings settings;
	
	@Test
	public void TestSave() throws Exception {
		String keywords = "one, two, three";
		AppSetting expected = new AppSetting(SettingName.KEYWORDS, keywords);
		AppSetting actual = settings.save(expected);
		Assertions.assertEquals(expected.getValue(), actual.getValue());
		Assertions.assertEquals(expected.getId(), actual.getId());
	}
	
	
	@Configuration
	@EnableAutoConfiguration
	static class TestContext {
	}
}
