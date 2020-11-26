package net.savantly.sprout.starter.security.jwt;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

import org.springframework.security.oauth2.jwt.Jwt;

import net.savantly.sprout.autoconfigure.properties.SproutConfigurationProperties;
import net.savantly.sprout.core.domain.user.SproutUser;
import net.savantly.sprout.core.domain.user.UserUpdateDto;
import net.savantly.sprout.core.security.SproutUserService;

public class DefaultJwtUserSynchronizer implements JwtUserSynchronizer {

	private final SproutUserService userService;
	private final SproutConfigurationProperties configProps;

	public DefaultJwtUserSynchronizer(SproutUserService userService, SproutConfigurationProperties configProps) {
		this.userService = userService;
		this.configProps = configProps;
	}

	@Override
	public SproutUser syncUser(Jwt jwt) {
		// uses the email as the username
		final String username = jwt.getClaimAsString("email");
		final String firstName = jwt.getClaimAsString("first_name");
		final String lastName = jwt.getClaimAsString("last_name");
		final List<String> groupsFromJwt = jwt
				.getClaimAsStringList(configProps.getSecurity().getAuthentication().getJwt().getGroupsClaim());
		final List<String> roles = Objects.nonNull(groupsFromJwt) ? groupsFromJwt : new ArrayList<>() ;

		if (userService.usernameExists(username)) {
			return userService.updateUser(new UserUpdateDto().setUsername(username).setFirstName(firstName)
					.setLastName(lastName).setRoles(roles));
		} else {
			return userService.createUser(username, UUID.randomUUID().toString(), username, roles);
		}
	}

}
