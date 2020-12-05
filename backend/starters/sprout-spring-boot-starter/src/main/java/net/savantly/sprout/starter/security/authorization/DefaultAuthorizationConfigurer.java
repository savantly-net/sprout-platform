package net.savantly.sprout.starter.security.authorization;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.ExpressionUrlAuthorizationConfigurer;

import net.savantly.sprout.autoconfigure.properties.SproutConfigurationProperties;

public class DefaultAuthorizationConfigurer implements AuthorizationConfigurer {

	private static final Logger log = LoggerFactory.getLogger(DefaultAuthorizationConfigurer.class);
	private static final String LOGIN_FORM_URL = "/login";
	private final SproutConfigurationProperties configProps;

	public DefaultAuthorizationConfigurer(SproutConfigurationProperties configProps) {
		this.configProps = configProps;
	}

	@Override
	public void configure(HttpSecurity http) {
		try {
			ExpressionUrlAuthorizationConfigurer<HttpSecurity>.ExpressionInterceptUrlRegistry registry = http
					.authorizeRequests();
			registry.antMatchers(HttpMethod.GET, "/admin", "/admin/", "/admin/**").hasAuthority("ADMIN");
			registry.antMatchers(LOGIN_FORM_URL).permitAll()
					.antMatchers("/css/**", "/js/**", "/api/login", "/api/account", "/api/public/**",
							"/api/authentication/oauth")
					.permitAll()
					.antMatchers(configProps.getSecurity().getAuthorization().getPublicPaths().toArray(new String[0]))
					.permitAll();

			configProps.getSecurity().getAuthorization().getPatterns().forEach(p -> {
				p.getExpression().forEach((method, expression) -> {
					registry.antMatchers(method, p.getPath()).access(expression);
				});
			});
			registry.antMatchers(
					configProps.getSecurity().getAuthorization().getAuthenticatedPaths().toArray(new String[0]))
					.not().anonymous();
		} catch (Exception e) {
			log.error("failed to execute authorization configuration", e);
		}
	}

}
