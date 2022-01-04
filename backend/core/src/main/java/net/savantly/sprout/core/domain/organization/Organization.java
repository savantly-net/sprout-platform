package net.savantly.sprout.core.domain.organization;

import javax.persistence.Entity;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.savantly.sprout.core.configuration.SproutConfiguration;
import net.savantly.sprout.core.domain.PersistedDomainObject;
//import net.savantly.sprout.core.domain.tenant.TenantSupport;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name="APP_ORGANIZATION")
//public class Organization extends PersistedDomainObject implements TenantSupport {
public class Organization extends PersistedDomainObject {

	private static final long serialVersionUID = SproutConfiguration.serialVersionUID;

	private String name;
//	private String tenantId;
}
