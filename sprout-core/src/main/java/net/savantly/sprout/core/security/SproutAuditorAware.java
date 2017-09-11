package net.savantly.sprout.core.security;

import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import net.savantly.sprout.core.domain.user.SproutUser;

@Service
public class SproutAuditorAware implements AuditorAware<String> {

    public String getCurrentAuditor() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null && authentication.isAuthenticated()) {
            if(authentication.getDetails() != null && authentication.getDetails().getClass().isAssignableFrom(SproutUser.class)){
            	return ((SproutUser) authentication.getDetails()).getId();
            } else if(authentication.getPrincipal() != null && authentication.getPrincipal().getClass().isAssignableFrom(SproutUser.class)){
            	return ((SproutUser) authentication.getPrincipal()).getId();
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