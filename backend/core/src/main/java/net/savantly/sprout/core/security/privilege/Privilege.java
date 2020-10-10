package net.savantly.sprout.core.security.privilege;

import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import javax.persistence.Transient;

import org.springframework.security.core.GrantedAuthority;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;
import net.savantly.sprout.core.configuration.SproutConfiguration;
import net.savantly.sprout.core.security.role.Role;
import net.savantly.sprout.core.tenancy.TenantedPersistedDomainObject;

@Getter @Setter
@Entity
@Accessors(chain = true)
public class Privilege extends TenantedPersistedDomainObject implements GrantedAuthority{

	private static final long serialVersionUID = SproutConfiguration.serialVersionUID;
	
	private String name;

    @ManyToMany(mappedBy = "privileges", targetEntity=Role.class)
    private Set<Role> roles;

	@Override
	@Transient
	public String getAuthority() {
		return id;
	}

	@Override
	public String toString() {
		return "Privilege [authority=" + id + "]";
	}
}