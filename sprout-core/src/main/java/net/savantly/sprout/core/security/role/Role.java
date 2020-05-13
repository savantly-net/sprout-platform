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

import net.savantly.sprout.core.domain.PersistedDomainObject;
import net.savantly.sprout.core.domain.user.SproutUserEntity;
import net.savantly.sprout.core.security.privilege.Privilege;

@Entity
public class Role extends PersistedDomainObject  {

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
    
    public Role() {	}

    public Role(String string) {
		this.id = string;
	}

	public Set<SproutUserEntity> getUsers() {
		return users;
	}

	public void setUsers(Set<SproutUserEntity> users) {
		this.users = users;
	}

	public Set<Privilege> getPrivileges() {
		return privileges;
	}

	public void setPrivileges(Set<Privilege> privileges) {
		this.privileges = privileges;
	}   
}