package net.savantly.sprout.core.domain.organization;

import javax.persistence.Entity;

import net.savantly.sprout.core.configuration.CoreConfiguration;
import net.savantly.sprout.core.domain.PersistedModule;

@Entity
public class Organization extends PersistedModule{

	private static final long serialVersionUID = CoreConfiguration.serialVersionUID;
	
	private String name;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
}
