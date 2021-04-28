package net.savantly.sprout.domain.menu;

import java.io.Serializable;
import java.util.Arrays;
import java.util.List;

import org.springframework.security.core.Authentication;

import net.savantly.sprout.core.security.permissions.Permission;
import net.savantly.sprout.core.security.permissions.SproutPermissionEvaluator;
import net.savantly.sprout.starter.security.acls.AclsUtil;

public class MenuDtoPermissionEvaluator implements SproutPermissionEvaluator<MenuDto> {

	@Override
	public List<String> getEvaluationType() {
		return Arrays.asList(MenuDto.class.getName());
	}

	@Override
	public boolean hasPermission(Authentication authentication, MenuDto targetDomainObject, Permission permission) {
		switch (permission) {
		case READ:
			return AclsUtil.hasAnyAuthority(targetDomainObject.getAuthorities(), authentication.getAuthorities());
		default:
			break;
		}
		return false;
	}

	@Override
	public boolean hasPermission(Authentication authentication, Serializable targetId, String targetType,
			Permission permission) {
		// TODO Auto-generated method stub
		return false;
	}

	

}
