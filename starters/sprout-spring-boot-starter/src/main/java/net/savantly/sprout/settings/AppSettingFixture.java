package net.savantly.sprout.settings;

import java.util.List;

import net.savantly.spring.fixture.AbstractBaseFixture;
import net.savantly.spring.fixture.Fixture;

public class AppSettingFixture extends AbstractBaseFixture<AppSetting, AppSettingRepository> {

	private AppSettingRepository repository;
	private String siteBanner = "./img/sprout.png";
	private String siteDescription = "A Sprout CMS Application";
	private String siteName = "Sprout";
	
	

	public AppSettingFixture(AppSettingRepository repository) {
		super(repository);
		this.repository = repository;
	}

	@Override
	public void addEntities(List<AppSetting> entityList) {
		ensure(SettingName.ADMIN_SITE_BANNER, siteBanner);
		ensure(SettingName.ADMIN_SITE_DESCRIPTION, siteDescription);
		ensure(SettingName.ADMIN_SITE_NAME, siteName);
		ensure(SettingName.ADMIN_SITE_TITLE, siteName);
	}

	private void ensure(SettingName name, String value) {
		if(!this.repository.findById(name.toString()).isPresent()) {
			this.repository.save(new AppSetting(name, value));
		}
	}

	@Override
	public void addDependencies(List<Fixture<?>> dependencies) {}

}
