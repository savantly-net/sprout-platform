package net.savantly.sprout.settings;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.test.context.junit4.SpringRunner;

@DataJpaTest
@RunWith(SpringRunner.class)
public class UISettingsTest {

	private static final Logger log = LoggerFactory.getLogger(UISettingsTest.class);

	@Autowired
	UISettings settings;
	
	@Test
	public void TestSave() throws Exception {
		String keywords = "one, two, three";
		AppSetting expected = new AppSetting(SettingName.KEYWORDS, keywords);
		AppSetting actual = settings.save(expected);
		Assert.assertEquals("Value should match", expected.getValue(), actual.getValue());
		Assert.assertEquals("Id should match", expected.getId(), actual.getId());
	}
	
	
	@Configuration
	@EntityScan(basePackageClasses=AppSetting.class)
	@EnableJpaRepositories(basePackageClasses=AppSettingRepository.class)
	static class TestContext {
		@Bean
		public UISettings uiSettings(AppSettingRepository appSettings) {
			return new UISettings(appSettings);
		}
	}
}
