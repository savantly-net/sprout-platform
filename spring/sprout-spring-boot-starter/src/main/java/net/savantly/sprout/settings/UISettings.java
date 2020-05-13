package net.savantly.sprout.settings;

import org.springframework.stereotype.Service;

@Service
public class UISettings {
	
	private AppSettingRepository settings;

	public UISettings(AppSettingRepository settings) {
		this.settings = settings;
	}
	
	public AppSetting save(AppSetting setting) {
		return settings.save(setting);
	}
	public Iterable<AppSetting> save(Iterable<AppSetting> setting) {
		return settings.saveAll(setting);
	}

	public AppSetting getKeywords() {
		return getSetting(SettingName.KEYWORDS);
	}
	public AppSetting getSiteDescription() {
		return getSetting(SettingName.SITE_DESCRIPTION);
	}
	public AppSetting getSiteUrl() {
		return getSetting(SettingName.SITE_URL);
	}
	public AppSetting getPreviewImage() {
		return getSetting(SettingName.PREVIEW_IMAGE);
	}
	public AppSetting getSiteTitle() {
		return getSetting(SettingName.SITE_TITLE);
	}
	public AppSetting getSiteBanner() {
		return getSetting(SettingName.SITE_BANNER);
	}
	public AppSetting getShowBanner() {
		return getSetting(SettingName.SHOW_BANNER);
	}
	public AppSetting getSiteName() {
		return getSetting(SettingName.SITE_NAME);
	}
	
	private AppSetting getSetting(SettingName settingName) {
		return settings.findById(settingName.name()).orElseThrow(()->new RuntimeException("missing setting: " + settingName.name()));
	}
	
}
