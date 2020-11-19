package net.savantly.sprout.core.security.role;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToMany;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;
import net.savantly.sprout.core.security.privilege.Privilege;
import net.savantly.sprout.core.tenancy.TenantedPersistedDomainObject;

@Getter @Setter
@Entity
@Accessors(chain = true)
public class Role extends TenantedPersistedDomainObject {
	
	private String name;

	@ManyToMany(fetch = FetchType.EAGER)
    private Set<Privilege> privileges = new HashSet<>();
	

}
