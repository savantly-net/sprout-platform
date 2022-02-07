package net.savantly.sprout.domain.uiProperties;

import javax.persistence.Entity;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.Data;
import lombok.experimental.Accessors;
import net.savantly.sprout.core.domain.privilege.PrivilegeEntity;
import net.savantly.sprout.core.tenancy.TenantedPersistedDomainObject;

@Data
@Entity
@Table(name="UI_PROPERTIES")
@Accessors(chain = true)
public class UIProperty extends TenantedPersistedDomainObject {

	private String name;
	private String value;
	
	@OneToOne(optional = true)
	private PrivilegeEntity requiredPrivilege;

}
