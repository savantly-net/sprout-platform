package net.savantly.sprout.core.security;

import java.util.Collection;

import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import net.savantly.sprout.core.domain.user.SproutUser;

public interface SproutUserService extends UserDetailsService {

	boolean usernameExists(String username);
    SproutUser loadByEmailAddress(String emailAddress);
    SproutUser loadUserByUsername(String username) throws UsernameNotFoundException;
    SproutUser createUser(String username, String password, String emailAddress, Collection<String> roles);
    
}
