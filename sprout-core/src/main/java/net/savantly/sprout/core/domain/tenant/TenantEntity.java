package net.savantly.sprout.core.domain.tenant;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.Table;

import net.savantly.sprout.core.domain.PersistedDomainObject;

@Entity
@Table(name="TENANT", schema=TenantEntity.TENANT_SCHEMA)
public class TenantEntity extends PersistedDomainObject implements Tenant{
	
	public final static String TENANT_SCHEMA = "sprout";
	
	private Set<String> aliases = new HashSet<String>();
	private String description;

	@ElementCollection
	public Set<String> getAliases() {
		return aliases;
	}

	public void setAliases(Set<String> aliases) {
		this.aliases = aliases;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
	
}
