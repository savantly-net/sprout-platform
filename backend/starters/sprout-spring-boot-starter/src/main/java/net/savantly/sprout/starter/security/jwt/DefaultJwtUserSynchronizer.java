package net.savantly.sprout.starter.security.jwt;

import java.util.stream.Collectors;

import net.savantly.sprout.core.domain.user.SproutUser;
import net.savantly.sprout.core.domain.user.UserUpdateDto;
import net.savantly.sprout.core.security.SproutUserService;

public class DefaultJwtUserSynchronizer implements JwtUserSynchronizer {

	private final SproutUserService userService;

	public DefaultJwtUserSynchronizer(SproutUserService userService) {
		this.userService = userService;
	}

	@Override
	public void syncUser(SproutUser user) {
		userService.updateUser(new UserUpdateDto()
				.setFirstName(user.getFirstName())
				.setLastName(user.getLastName())
				.setRoles(user.getRoles().stream().map(r -> r.getName()).collect(Collectors.toList())));
	}

}
