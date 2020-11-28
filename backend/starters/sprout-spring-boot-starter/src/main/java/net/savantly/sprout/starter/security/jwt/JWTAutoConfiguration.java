package net.savantly.sprout.starter.security.jwt;

import java.util.Objects;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Conditional;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.converter.Converter;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.core.OAuth2Error;
import org.springframework.security.oauth2.core.OAuth2TokenValidator;
import org.springframework.security.oauth2.core.OAuth2TokenValidatorResult;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;

import net.savantly.authorization.service.PermissionProvider;
import net.savantly.sprout.autoconfigure.properties.SproutConfigurationProperties;
import net.savantly.sprout.core.security.users.SproutUserService;
import net.savantly.sprout.starter.security.conditions.AnyJwkUriConfigured;
import net.savantly.sprout.starter.security.conditions.NoJwkUriConfigured;

@Configuration
public class JWTAutoConfiguration {

	@Value("${spring.security.oauth2.resourceserver.jwt.jwk-set-uri:}")
	private String springResourceServerJwkUri;

	private SproutConfigurationProperties properties;

	public JWTAutoConfiguration(SproutConfigurationProperties properties) {
		this.properties = properties;
	}

	@Bean("jwtUserSynchronizer")
	@ConditionalOnMissingBean(value = { JwtUserSynchronizer.class }, name = { "jwtUserSynchronizer" })
	public DefaultJwtUserSynchronizer jwtUserSynchronizer(SproutUserService userService, SproutConfigurationProperties configProps) {
		return new DefaultJwtUserSynchronizer(userService, configProps);
	}

	@Bean
	@ConditionalOnMissingBean({ JWTConfigurer.class })
	@Conditional(NoJwkUriConfigured.class)
	public JWTConfigurer jwtConfigurer(TokenProvider tokenProvider) {
		return new DefaultJWTConfigurer(tokenProvider);
	}

	@Bean(name = "jwtAuthenticationConverter")
	@ConditionalOnMissingBean(value = { JwtAuthenticationConverter.class }, name = { "jwtAuthenticationConverter" })
	public Converter<Jwt, AbstractAuthenticationToken> jwtAuthenticationConverter(PermissionProvider permissionProvider,
			SproutUserService users, JwtUserSynchronizer synchronizer) {
		return new DefaultJwtAuthenticationConverter(synchronizer, users, permissionProvider,
				properties.getSecurity().getAuthentication().getJwt().getGroupsClaim());
	}

	@Bean
	@ConditionalOnMissingBean({ JWTConfigurer.class })
	@Conditional(AnyJwkUriConfigured.class)
	public JWTConfigurer oauthJwtConfigurer(Converter<Jwt, AbstractAuthenticationToken> jwtAuthenticationConverter) {
		return new JWTConfigurer() {
			@Override
			public void configure(HttpSecurity builder) throws Exception {
				builder.oauth2ResourceServer().jwt((c) -> {
					c.jwkSetUri(getJwkSetUri());
					c.jwtAuthenticationConverter(jwtAuthenticationConverter);
				});
			}

			private String getJwkSetUri() {
				String sproutJwkProp = properties.getSecurity().getAuthentication().getJwt().getJwkSetUri();
				if (Objects.nonNull(sproutJwkProp)) {
					return sproutJwkProp;
				} else {
					return springResourceServerJwkUri;
				}
			}
		};
	}

	@Bean
	@ConditionalOnMissingBean({ TokenProvider.class })
	@Conditional(NoJwkUriConfigured.class)
	public TokenProvider tokenProvider(SproutConfigurationProperties props) {
		return new DefaultTokenProvider(props);
	}

	// not implemented yet
	static class AudienceValidator implements OAuth2TokenValidator<Jwt> {
		OAuth2Error error = new OAuth2Error("custom_code", "Custom error message", null);
		SproutConfigurationProperties props;

		public AudienceValidator(SproutConfigurationProperties props) {
			this.props = props;
		}

		@Override
		public OAuth2TokenValidatorResult validate(Jwt jwt) {
			if (jwt.getAudience().contains("messaging")) {
				return OAuth2TokenValidatorResult.success();
			} else {
				return OAuth2TokenValidatorResult.failure(error);
			}
		}
	}
}
