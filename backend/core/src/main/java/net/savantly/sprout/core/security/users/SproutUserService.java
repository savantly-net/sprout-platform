package net.savantly.sprout.core.security.users;

import java.util.Collection;

import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import net.savantly.sprout.core.domain.user.SproutUser;
import net.savantly.sprout.core.domain.user.UserUpdateDto;

public interface SproutUserService extends UserDetailsService {

	boolean usernameExists(String username);
    SproutUser loadByEmailAddress(String emailAddress);
    SproutUser loadUserByUsername(String username) throws UsernameNotFoundException;
    SproutUser createUser(String username, String password, String emailAddress, Collection<String> roles);
    SproutUser updateUser(UserUpdateDto user);
    boolean emailAddressExists(String email);
    void updatePassword(SproutUser user, String clearText);
}
