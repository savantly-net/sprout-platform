package net.savantly.sprout.starter.security.acls;

import java.util.Collection;

import javax.validation.constraints.NotNull;

import org.springframework.security.core.GrantedAuthority;

public class AclsUtil {

	/**
	 * Check if a collection of granted authorities contains any of the required authorities. <br>
	 * Convenience for permission evaluators. <br>
	 * If requiredAuthorities is empty, true is returned<br>
	 * <br>
	 * @param requiredAuthorities The list of authorities the user should have at least one of 
	 * @param usersAuthorities The user's actual authorities
	 * @return true when the user has at least one of the required authorities.  
	 */
	public static boolean hasAnyAuthority(
			@NotNull Collection<String> requiredAuthorities,
			@NotNull Collection<? extends GrantedAuthority> usersAuthorities) {
		if (requiredAuthorities.isEmpty()) {
			return true;
		}
		for (GrantedAuthority grantedAuthority : usersAuthorities) {
			if (requiredAuthorities.stream().anyMatch(s -> s.contentEquals(grantedAuthority.getAuthority()))) {
				return true;
			}
		}
		return false;
	}
}
