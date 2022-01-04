package net.savantly.sprout.domain.uiProperties;

import javax.persistence.Entity;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.Data;
import lombok.experimental.Accessors;
import net.savantly.sprout.core.domain.PersistedDomainObject;
import net.savantly.sprout.core.domain.privilege.Privilege;

@Data
@Entity
@Table(name="UI_PROPERTIES")
@Accessors(chain = true)
public class UIProperty extends PersistedDomainObject {

	private String name;
	private String value;

	@OneToOne(optional = true)
	private Privilege requiredPrivilege;

}
