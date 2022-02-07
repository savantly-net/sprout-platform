package net.savantly.sprout.core.domain.role;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;
import net.savantly.sprout.core.domain.privilege.PrivilegeEntity;
import net.savantly.sprout.core.tenancy.TenantedPersistedDomainObject;

@Getter @Setter
@Entity(name="APP_ROLE")
@Table(name="APP_ROLE", uniqueConstraints = {@UniqueConstraint(columnNames = {"name", "tenant_id"})})
@Accessors(chain = true)
public class RoleEntity extends TenantedPersistedDomainObject implements Role {
	
	private String name;

	@ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name="APP_ROLE_APP_PRIVILEGE",
    joinColumns=
        @JoinColumn(name="APP_ROLE_ID", referencedColumnName="ID"),
    inverseJoinColumns=
        @JoinColumn(name="APP_PRIVILEGE_ID", referencedColumnName="ID")
    )
    private Set<PrivilegeEntity> privileges = new HashSet<>();
	

}
