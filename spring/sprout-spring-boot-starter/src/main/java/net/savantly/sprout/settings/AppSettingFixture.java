package net.savantly.sprout.settings;

import java.util.List;

import net.savantly.spring.fixture.AbstractBaseFixture;
import net.savantly.spring.fixture.Fixture;

public class AppSettingFixture extends AbstractBaseFixture<AppSetting, AppSettingRepository> {

	private AppSettingRepository repository;

	private String keywords = "sprout, spring, cms";
	private String siteBanner = "./img/sprout.png";
	private String siteDescription = "A Sprout CMS Application";
	private String siteName = "Sprout";
	private String empty = "";
	
	

	public AppSettingFixture(AppSettingRepository repository) {
		super(repository);
		this.repository = repository;
	}

	@Override
	public void addEntities(List<AppSetting> entityList) {
		ensure(SettingName.KEYWORDS, keywords);
		ensure(SettingName.PREVIEW_IMAGE, empty);
		ensure(SettingName.SHOW_BANNER, "true");
		ensure(SettingName.SITE_BANNER, siteBanner);
		ensure(SettingName.SITE_DESCRIPTION, siteDescription);
		ensure(SettingName.SITE_NAME, siteName);
		ensure(SettingName.SITE_TITLE, siteName);
		ensure(SettingName.SITE_URL, empty);
	}

	private void ensure(SettingName name, String value) {
		if(!this.repository.findById(name.toString()).isPresent()) {
			this.repository.save(new AppSetting(name, value));
		}
	}

	@Override
	public void addDependencies(List<Fixture<?>> dependencies) {}

}
