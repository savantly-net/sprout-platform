package net.savantly.sprout.uiProperties;

import javax.persistence.Entity;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.Data;
import net.savantly.sprout.core.security.privilege.Privilege;
import net.savantly.sprout.core.tenancy.TenantedPersistedDomainObject;

@Data
@Entity
@Table(name="UI_PROPERTIES")
public class UIProperty extends TenantedPersistedDomainObject {

	private String name;
	private String value;
	
	@OneToOne(optional = true)
	private Privilege requiredPrivilege;

}
