package net.savantly.sprout.core.security.privilege;

import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import javax.persistence.Transient;

import org.springframework.security.core.GrantedAuthority;

import net.savantly.sprout.core.domain.PersistedDomainObject;
import net.savantly.sprout.core.security.role.Role;

@Entity
public class Privilege extends PersistedDomainObject implements GrantedAuthority{

	private static final long serialVersionUID = -8442995033031637920L;
    private Set<Role> roles;
	
	public Privilege(){}

	public Privilege(String role) {
		this.id = role;
	}

	@Override
	@Transient
	public String getAuthority() {
		return id;
	}

    @ManyToMany(mappedBy = "privileges", targetEntity=Role.class)
	public Set<Role> getRoles() {
		return roles;
	}

	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}

	@Override
	public String toString() {
		return "Privilege [authority=" + id + "]";
	}
}
