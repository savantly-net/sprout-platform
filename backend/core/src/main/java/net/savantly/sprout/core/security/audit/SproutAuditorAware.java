package net.savantly.sprout.core.security.audit;

import java.util.Optional;

import org.springframework.data.domain.AuditorAware;

import net.savantly.sprout.core.security.SproutSecurityContext;

public class SproutAuditorAware implements AuditorAware<String> {

    public Optional<String> getCurrentAuditor() {
        return SproutSecurityContext.getCurrentUserId();
    }
}