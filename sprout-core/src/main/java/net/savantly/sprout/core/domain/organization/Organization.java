package net.savantly.sprout.core.domain.organization;

import javax.persistence.Entity;

import net.savantly.sprout.core.configuration.SproutConfiguration;
import net.savantly.sprout.core.domain.PersistedDomainObject;

@Entity
public class Organization extends PersistedDomainObject{

	private static final long serialVersionUID = SproutConfiguration.serialVersionUID;
	
	private String name;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
}
