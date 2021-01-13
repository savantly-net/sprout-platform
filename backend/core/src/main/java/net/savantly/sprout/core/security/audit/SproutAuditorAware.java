package net.savantly.sprout.core.security.audit;

import java.util.Objects;
import java.util.Optional;

import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import net.savantly.sprout.core.domain.user.SproutUser;
import net.savantly.sprout.core.domain.user.SproutUserEntity;

public class SproutAuditorAware implements AuditorAware<String> {

    public Optional<String> getCurrentAuditor() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String result = null;

        if (authentication != null && authentication.isAuthenticated()) {
            if(authentication.getDetails() != null && authentication.getDetails().getClass().isAssignableFrom(SproutUserEntity.class)){
            	result = ((SproutUserEntity) authentication.getDetails()).getItemId();
            } else if(authentication.getPrincipal() != null && authentication.getPrincipal().getClass().isAssignableFrom(SproutUserEntity.class)){
            	result = ((SproutUserEntity) authentication.getPrincipal()).getItemId();
            } else {
            	//throw new RuntimeException("Invalid Security Principal.");
            	result = (SproutUser.anonymousUser()).getUsername();
            }
        }
        
        if (Objects.nonNull(result)) {
        	return Optional.of(result);
        } else {
        	return Optional.empty();
        }
    }
}