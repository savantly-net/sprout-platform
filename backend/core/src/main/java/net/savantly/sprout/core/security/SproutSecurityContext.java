package net.savantly.sprout.core.security;

import java.util.Objects;
import java.util.Optional;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import net.savantly.sprout.core.domain.user.SproutUser;
import net.savantly.sprout.core.domain.user.SproutUserEntity;

public class SproutSecurityContext {

	public static Optional<String> getCurrentUserId() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String result = null;

        if (authentication != null && authentication.isAuthenticated()) {
            if(authentication.getDetails() != null && authentication.getDetails().getClass().isAssignableFrom(SproutUserEntity.class)){
            	result = ((SproutUserEntity) authentication.getDetails()).getId();
            } else if(authentication.getPrincipal() != null && authentication.getPrincipal().getClass().isAssignableFrom(SproutUserEntity.class)){
            	result = ((SproutUserEntity) authentication.getPrincipal()).getId();
            } else {
            	result = (SproutUser.anonymousUser()).getUsername();
            }
        }
        
        if (Objects.nonNull(result)) {
        	return Optional.of(result);
        } else {
        	return Optional.empty();
        }
    }
	
	public static Optional<SproutUser> getCurrentUser() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        SproutUser result = null;

        if (authentication != null && authentication.isAuthenticated()) {
            if(authentication.getDetails() != null && authentication.getDetails().getClass().isAssignableFrom(SproutUserEntity.class)){
            	result = ((SproutUserEntity) authentication.getDetails());
            } else if(authentication.getPrincipal() != null && authentication.getPrincipal().getClass().isAssignableFrom(SproutUserEntity.class)){
            	result = ((SproutUserEntity) authentication.getPrincipal());
            } else {
            	result = (SproutUser.anonymousUser());
            }
        }
        
        if (Objects.nonNull(result)) {
        	return Optional.of(result);
        } else {
        	return Optional.empty();
        }
    }
}
