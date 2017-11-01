package net.savantly.sprout.settings;

import org.springframework.stereotype.Service;

@Service
public class UISettings {
	
	private AppSettingRepository settings;

	public UISettings(AppSettingRepository settings) {
		this.settings = settings;
	}
	
	public final static String KEYWORDS = "KEYWORDS";
	public final static String SITE_DESCRIPTION = "SITE_DESCRIPTION";
	public final static String SITE_URL = "SITE_URL";
	public final static String PREVIEW_IMAGE = "PREVIEW_IMAGE";
	public final static String SITE_TITLE = "SITE_TITLE";
	public final static String SITE_BANNER = "SITE_BANNER";
	public final static String SHOW_BANNER = "SHOW_BANNER";
	public final static String SITE_NAME = "SITE_NAME";
	
	public AppSetting save(AppSetting setting) {
		return settings.save(setting);
	}
	public Iterable<AppSetting> save(Iterable<AppSetting> setting) {
		return settings.save(setting);
	}

	public AppSetting getKeywords() {
		return settings.findOne(KEYWORDS);
	}
	public AppSetting getSiteDescription() {
		return settings.findOne(SITE_DESCRIPTION);
	}
	public AppSetting getSiteUrl() {
		return settings.findOne(SITE_URL);
	}
	public AppSetting getPreviewImage() {
		return settings.findOne(PREVIEW_IMAGE);
	}
	public AppSetting getSiteTitle() {
		return settings.findOne(SITE_TITLE);
	}
	public AppSetting getSiteBanner() {
		return settings.findOne(SITE_BANNER);
	}
	public AppSetting getShowBanner() {
		return settings.findOne(SHOW_BANNER);
	}
	public AppSetting getSiteName() {
		return settings.findOne(SITE_NAME);
	}
	
}
