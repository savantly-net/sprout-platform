package net.savantly.sprout.starter.security.conditions;

import org.springframework.boot.autoconfigure.condition.AnyNestedCondition;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;

public class AnyJwkUriConfigured extends AnyNestedCondition {

	public AnyJwkUriConfigured() {
		super(ConfigurationPhase.REGISTER_BEAN);
	}
	
	@ConditionalOnProperty(prefix = "spring", name = "security.oauth2.resourceserver.jwt.jwk-set-uri")
    static class OnResourceServerJwkUri {
    }
	
	@ConditionalOnProperty(prefix = "spring", name = "security.oauth2.client.provider.oidc.issuer-uri")
	static class OnOidcIssuerUri {
		
	}

}
