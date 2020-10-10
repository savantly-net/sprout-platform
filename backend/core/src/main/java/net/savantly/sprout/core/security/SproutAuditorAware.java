package net.savantly.sprout.core.security;

import java.util.Optional;

import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import net.savantly.sprout.core.domain.user.SproutUser;
import net.savantly.sprout.core.domain.user.SproutUserEntity;

public class SproutAuditorAware implements AuditorAware<SproutUser> {

    public Optional<SproutUser> getCurrentAuditor() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null && authentication.isAuthenticated()) {
            if(authentication.getDetails() != null && authentication.getDetails().getClass().isAssignableFrom(SproutUserEntity.class)){
            	return Optional.of((SproutUserEntity) authentication.getDetails());
            } else if(authentication.getPrincipal() != null && authentication.getPrincipal().getClass().isAssignableFrom(SproutUserEntity.class)){
            	return Optional.of((SproutUserEntity) authentication.getPrincipal());
            } else {
            	//throw new RuntimeException("Invalid Security Principal.");
            	return Optional.of(SproutUser.guestUser());
            }
        }

        return null;
    }
}