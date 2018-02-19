package net.savantly.sprout.core.domain.tenant;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.Table;

import net.savantly.sprout.core.domain.PersistedDomainObject;

@Entity
@Table(name="TENANT")
public class TenantEntity extends PersistedDomainObject implements Tenant{
	
	private Set<String> aliases = new HashSet<String>();

	@ElementCollection
	public Set<String> getAliases() {
		return aliases;
	}

	public void setAliases(Set<String> aliases) {
		this.aliases = aliases;
	}
	
}
