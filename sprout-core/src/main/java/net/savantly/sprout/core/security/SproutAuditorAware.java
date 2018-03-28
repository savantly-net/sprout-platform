package net.savantly.sprout.core.security;

import java.util.Optional;

import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import net.savantly.sprout.core.domain.user.SproutUserEntity;

public class SproutAuditorAware implements AuditorAware<String> {

    public Optional<String> getCurrentAuditor() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null && authentication.isAuthenticated()) {
            if(authentication.getDetails() != null && authentication.getDetails().getClass().isAssignableFrom(SproutUserEntity.class)){
            	return Optional.of(((SproutUserEntity) authentication.getDetails()).getId());
            } else if(authentication.getPrincipal() != null && authentication.getPrincipal().getClass().isAssignableFrom(SproutUserEntity.class)){
            	return Optional.of(((SproutUserEntity) authentication.getPrincipal()).getId());
            } else if(authentication.getPrincipal() != null && authentication.getPrincipal().getClass().isAssignableFrom(String.class)) {
            	return Optional.of(authentication.getPrincipal().toString());
            } else {
            	//throw new RuntimeException("Invalid Security Principal.");
            	return Optional.of("guest");
            }
        }
        
        return null;
    }
}