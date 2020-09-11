package net.savantly.sprout.starter.security.oidc;

import org.springframework.boot.autoconfigure.condition.ConditionalOnExpression;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OIDCAutoConfiguration {


	@Bean
	@ConditionalOnMissingBean({OIDCConfigurer.class})
	@ConditionalOnExpression("spring.security.oauth2.client.provider.oidc.issuer-uri")
	public OIDCConfigurer oidcConfigurer() {
		return new DefaultOIDCConfigurer();
	}
}
