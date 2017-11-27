package net.savantly.sprout.core.security.roles;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import org.springframework.security.core.GrantedAuthority;

import net.savantly.sprout.core.domain.user.SproutUserEntity;

@Entity
public class Role implements GrantedAuthority{

	private static final long serialVersionUID = -8442995033031637920L;
	private String authority;
	private Set<SproutUserEntity> users = new HashSet<SproutUserEntity>();
	
	public Role(){}

	public Role(String role) {
		this.authority = role;
	}

	@Id
	@Override
	public String getAuthority() {
		return authority;
	}

	public void setAuthority(String authority) {
		this.authority = authority;
	}

	@OneToMany
	public Set<SproutUserEntity> getUsers() {
		return users;
	}

	public void setUsers(Set<SproutUserEntity> users) {
		this.users = users;
	}
	

	@Override
	public String toString() {
		return "Role [authority=" + authority + "]";
	}

}
