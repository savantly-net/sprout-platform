package net.savantly.sprout.settings;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class AppSetting {
	
	private String id;
	private String value;
	
	@Id
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	
	public String getValue() {
		return value;
	}
	public void setValue(String value) {
		this.value = value;
	}

}
