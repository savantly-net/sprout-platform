package net.savantly.sprout.starter.security.jwt;

import java.util.UUID;
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
		if (userService.usernameExists(user.getUsername())) {
			userService.updateUser(new UserUpdateDto().setUsername(user.getUsername()).setFirstName(user.getFirstName()).setLastName(user.getLastName())
					.setRoles(user.getRoles().stream().map(r -> r.getName()).collect(Collectors.toList())));
		} else {
			userService.createUser(user.getUsername(), UUID.randomUUID().toString(),
					user.getPrimaryEmailAddress().getEmailAddress(),
					user.getRoles().stream().map(r -> r.getName()).collect(Collectors.toList()));
		}
	}

}
