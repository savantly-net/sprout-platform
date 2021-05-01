package net.savantly.sprout.core.domain.privilege;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.persistence.UniqueConstraint;

import org.springframework.security.core.GrantedAuthority;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;
import net.savantly.sprout.core.configuration.SproutConfiguration;
import net.savantly.sprout.core.tenancy.TenantedPersistedDomainObject;

@Getter @Setter
@Entity(name="APP_PRIVILEGE")
@Table(name="APP_PRIVILEGE", uniqueConstraints = {@UniqueConstraint(columnNames = {"name", "tenant_id"})})
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