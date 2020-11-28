package net.savantly.sprout.core.domain.privilege;

import javax.persistence.Entity;
import javax.persistence.Transient;

import org.springframework.security.core.GrantedAuthority;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;
import net.savantly.sprout.core.configuration.SproutConfiguration;
import net.savantly.sprout.core.tenancy.TenantedPersistedDomainObject;

@Getter @Setter
@Entity
@Accessors(chain = true)
public class Privilege extends TenantedPersistedDomainObject implements GrantedAuthority{

	private static final long serialVersionUID = SproutConfiguration.serialVersionUID;
	
	private String name;

	@Override
	@Transient
	public String getAuthority() {
		return name;
	}

	@Override
	public String toString() {
		return "Privilege [authority=" + id + "]";
	}
}