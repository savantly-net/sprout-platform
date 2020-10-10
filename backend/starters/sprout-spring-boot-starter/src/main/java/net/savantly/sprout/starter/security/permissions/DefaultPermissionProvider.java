package net.savantly.sprout.starter.security.permissions;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import net.savantly.authorization.service.PermissionProvider;
import net.savantly.sprout.core.security.role.Role;
import net.savantly.sprout.core.security.role.RoleRepository;

public class DefaultPermissionProvider implements PermissionProvider {
	
	private static final Logger log = LoggerFactory.getLogger(DefaultPermissionProvider.class);
	
	private final RoleRepository roles;
	
	public DefaultPermissionProvider(RoleRepository roles) {
		this.roles = roles;
	}

	@Override
	public List<String> getEffectivePermissions(String role) {
		List<Role> found = this.roles.findByName(role);
		if(found.size() > 1) {
			log.error("Found more than 1 role by name: " + role + ". Likely due to result from more than 1 tenant. This shouldn't happen");
		} else if (found.size() == 1) {
			return found.stream().flatMap(p -> p.getPrivileges().stream()).map(p -> p.getAuthority()).collect(Collectors.toList());
		} 
		return Collections.EMPTY_LIST;
	}

}
