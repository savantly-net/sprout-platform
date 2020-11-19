package net.savantly.sprout.core.security;

import java.util.Collection;

import org.springframework.security.core.userdetails.UserDetailsService;

import net.savantly.sprout.core.domain.user.SproutUser;

public interface SproutUserService extends UserDetailsService {

	boolean usernameExists(String username);
    SproutUser loadByEmailAddress(String emailAddress);
    SproutUser createUser(String username, String password, String emailAddress, Collection<String> roles);
    
}
