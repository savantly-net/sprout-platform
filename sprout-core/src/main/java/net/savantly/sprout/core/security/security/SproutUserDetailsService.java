package net.savantly.sprout.core.security.security;

import org.springframework.security.core.userdetails.UserDetailsService;

import net.savantly.sprout.core.domain.user.SproutUser;

public interface SproutUserDetailsService extends UserDetailsService{

    SproutUser loadByEmailAddress(String emailAddress);
    
}
