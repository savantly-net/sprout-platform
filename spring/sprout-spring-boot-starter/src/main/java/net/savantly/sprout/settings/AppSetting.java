package net.savantly.sprout.settings;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class AppSetting {
	
	private SettingName id;
	private String value;
	
	public AppSetting() {}
	
	public AppSetting(SettingName id, String value) {
		super();
		this.id = id;
		this.value = value;
	}



	@Id
	public SettingName getId() {
		return id;
	}
	public void setId(SettingName id) {
		this.id = id;
	}
	
	public String getValue() {
		return value;
	}
	public void setValue(String value) {
		this.value = value;
	}

}
