package net.savantly.sprout.core.security.roles;

import javax.persistence.Entity;
import javax.persistence.Id;

import org.springframework.security.core.GrantedAuthority;

@Entity
public class Role implements GrantedAuthority{

	private static final long serialVersionUID = -8442995033031637920L;
	private String authority;
	
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

	@Override
	public String toString() {
		return "Role [authority=" + authority + "]";
	}
	
}
