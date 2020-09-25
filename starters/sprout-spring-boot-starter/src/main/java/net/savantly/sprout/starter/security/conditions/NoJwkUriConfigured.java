package net.savantly.sprout.starter.security.conditions;

import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.boot.autoconfigure.condition.NoneNestedConditions;

public class NoJwkUriConfigured extends NoneNestedConditions {

	public NoJwkUriConfigured() {
		super(ConfigurationPhase.REGISTER_BEAN);
	}
	
	@ConditionalOnProperty(prefix = "spring", name = "security.oauth2.resourceserver.jwt.jwk-set-uri")
    static class OnResourceServerJwkUri {}

	@ConditionalOnProperty(prefix = "sprout", name = "security.authentication.jwt.jwk-set-uri")
    static class OnSproutServerJwkUri {}

}
