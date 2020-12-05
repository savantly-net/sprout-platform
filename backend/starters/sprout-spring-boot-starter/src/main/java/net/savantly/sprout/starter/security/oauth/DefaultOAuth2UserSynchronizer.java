package net.savantly.sprout.starter.security.oauth;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.oauth2.core.user.OAuth2User;

import net.savantly.sprout.core.domain.user.SproutUser;
import net.savantly.sprout.core.domain.user.UserUpdateDto;
import net.savantly.sprout.core.security.users.SproutUserService;

public class DefaultOAuth2UserSynchronizer implements OAuth2UserSynchronizer {
	
	private final static Logger log = LoggerFactory.getLogger(DefaultOAuth2UserSynchronizer.class);

	private final SproutUserService userService;

	public DefaultOAuth2UserSynchronizer(SproutUserService userService) {
		this.userService = userService;
	}

	@Override
	public SproutUser syncUser(OAuth2User user) {

		String email = user.getAttribute("email");
		List<String> roles = extractRoles(user);
		
		SproutUser sproutUser = null;

		if (userService.usernameExists(email)) {
			sproutUser = userService.loadUserByUsername(email);
		} else {
			sproutUser = userService.createUser(email, UUID.randomUUID().toString(), email, roles);
		}
		UserUpdateDto updates = new UserUpdateDto()
				.setUsername(sproutUser.getUsername())
				.setFirstName(user.getAttribute("first_name"))
				.setLastName(user.getAttribute("last_name"))
				.setRoles(roles);

		return userService.updateUser(updates);

	}
	
	private List<String> extractRoles(OAuth2User user) {
		List<String> roles = new ArrayList<>();
		Object groupAttribute = user.getAttribute("groups");
		if(Collection.class.isAssignableFrom(groupAttribute.getClass())) {
			((Collection)groupAttribute).stream().forEach(g -> {
				if (String.class.isAssignableFrom(g.getClass())) {
					roles.add(g.toString());
				} else {
					log.error("the group name should be a string");
				}
			});
		} else {
			log.error("the groups attribute is expected to be a collection of strings");
		}
		return roles;
	}
}
