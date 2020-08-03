package net.savantly.sprout.core.module.registration;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class SproutModuleRegistration {

	private String id;
	private String name;
	private boolean enabled;
	private boolean installed;
	
    @Id
    @Column(columnDefinition = "CHAR(36)")
    public String getId() {
        return id;
    }
    
    /**
     * Sets the id of the entity.
     * 
     * @param id the id to set
     */
    public void setId(final String id) {
        this.id = id;
    }

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public boolean isEnabled() {
		return enabled;
	}

	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}

	public boolean isInstalled() {
		return installed;
	}

	public void setInstalled(boolean installed) {
		this.installed = installed;
	}
}
