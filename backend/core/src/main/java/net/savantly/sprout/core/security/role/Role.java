package net.savantly.sprout.core.security.role;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;
import net.savantly.sprout.core.domain.user.SproutUserEntity;
import net.savantly.sprout.core.security.privilege.Privilege;
import net.savantly.sprout.core.tenancy.TenantedPersistedDomainObject;

@Getter @Setter
@Entity
@Accessors(chain = true)
public class Role extends TenantedPersistedDomainObject  {
	
	private String name;

    @JsonIgnore
    @ManyToMany(mappedBy = "roles")
    private Set<SproutUserEntity> users = new HashSet<>();
	@ManyToMany(fetch=FetchType.EAGER)
    @JoinTable(
        name = "roles_privileges", 
        joinColumns = @JoinColumn(
          name = "role_id", referencedColumnName = "id"), 
        inverseJoinColumns = @JoinColumn(
          name = "privilege_id"))
    @JsonIgnoreProperties("roles")
    private Set<Privilege> privileges = new HashSet<>();

}
