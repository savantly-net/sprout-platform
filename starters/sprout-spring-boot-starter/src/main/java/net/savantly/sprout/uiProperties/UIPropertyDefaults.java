package net.savantly.sprout.uiProperties;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class UIPropertyDefaults {
	
	enum AppSettingDefaultType {
		
		ADMIN_SITE_LOGO_URL("./img/logo.png"),
		ADMIN_SITE_TITLE("Sprout Administration"),
		ADMIN_SITE_DESCRIPTION("Perform administration functions for your Sprout Application"),
		ADMIN_SITE_BANNER("./img/banner.png"),
		ADMIN_SITE_NAME("Sprout Admin");
		
		String value;
		
		AppSettingDefaultType(String value) {
			this.value = value;
		}
		
		UIProperty toAppSetting(){
			UIProperty setting = new UIProperty();
			setting.setName(this.name());
			setting.setValue(this.value);
			return setting;
		}
	}
	
	
	static public List<UIProperty> getDefaults() {
		return Arrays.stream(AppSettingDefaultType.values()).map(t -> {
			return t.toAppSetting();
		}).collect(Collectors.toList());
	}

}
