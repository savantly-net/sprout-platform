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
		return settings.findById(SettingName.KEYWORDS.toString()).orElseGet(null);
	}
	public AppSetting getSiteDescription() {
		return settings.findById(SettingName.SITE_DESCRIPTION.toString()).orElseGet(null);
	}
	public AppSetting getSiteUrl() {
		return settings.findById(SettingName.SITE_URL.toString()).orElseGet(null);
	}
	public AppSetting getPreviewImage() {
		return settings.findById(SettingName.PREVIEW_IMAGE.toString()).orElseGet(null);
	}
	public AppSetting getSiteTitle() {
		return settings.findById(SettingName.SITE_TITLE.toString()).orElseGet(null);
	}
	public AppSetting getSiteBanner() {
		return settings.findById(SettingName.SITE_BANNER.toString()).orElseGet(null);
	}
	public AppSetting getShowBanner() {
		return settings.findById(SettingName.SHOW_BANNER.toString()).orElseGet(null);
	}
	public AppSetting getSiteName() {
		return settings.findById(SettingName.SITE_NAME.toString()).orElseGet(null);
	}
	
}
