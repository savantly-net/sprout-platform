package net.savantly.sprout.core.security;

import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import net.savantly.sprout.core.domain.user.SproutUserEntity;

public class SproutAuditorAware implements AuditorAware<String> {

    public String getCurrentAuditor() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null && authentication.isAuthenticated()) {
            if(authentication.getDetails() != null && authentication.getDetails().getClass().isAssignableFrom(SproutUserEntity.class)){
            	return ((SproutUserEntity) authentication.getDetails()).getId();
            } else if(authentication.getPrincipal() != null && authentication.getPrincipal().getClass().isAssignableFrom(SproutUserEntity.class)){
            	return ((SproutUserEntity) authentication.getPrincipal()).getId();
            } else if(authentication.getPrincipal() != null && authentication.getPrincipal().getClass().isAssignableFrom(String.class)) {
            	return authentication.getPrincipal().toString();
            } else {
            	//throw new RuntimeException("Invalid Security Principal.");
            	return "guest";
            }
        }
        
        return null;
    }
}