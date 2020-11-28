package net.savantly.sprout.autoconfigure;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.zalando.problem.spring.web.advice.security.SecurityProblemSupport;

import net.savantly.authorization.service.PermissionProvider;
import net.savantly.sprout.autoconfigure.properties.SproutConfigurationProperties;
import net.savantly.sprout.core.domain.emailAddress.repository.EmailAddressRepository;
import net.savantly.sprout.core.domain.role.RoleRepository;
import net.savantly.sprout.core.domain.user.repository.UserPersistenceListener;
import net.savantly.sprout.core.domain.user.repository.UserRepository;
import net.savantly.sprout.core.security.audit.SproutAuditorAware;
import net.savantly.sprout.core.security.users.SproutPasswordEncoder;
import net.savantly.sprout.core.security.users.SproutUserService;
import net.savantly.sprout.core.security.users.SproutUserServiceImpl;
import net.savantly.sprout.starter.SproutWebSecurityConfiguration;
import net.savantly.sprout.starter.security.PermissionAwareSproutUserService;
import net.savantly.sprout.starter.security.SecurityCustomizer;
import net.savantly.sprout.starter.security.anonymous.AnonymousAuthAutoConfiguration;
import net.savantly.sprout.starter.security.authorization.AuthorizationAutoConfiguration;
import net.savantly.sprout.starter.security.basic.BasicAuthAutoConfiguration;
import net.savantly.sprout.starter.security.jwt.JWTAutoConfiguration;
import net.savantly.sprout.starter.security.oauth.OAuthAutoConfiguration;
import net.savantly.sprout.starter.security.permissions.PermissionsConfiguration;
import net.savantly.sprout.starter.security.session.CookieSecurityContextRepository;
import net.savantly.sprout.starter.security.session.LoginWithTargetUrlAuthenticationEntryPoint;
import net.savantly.sprout.starter.security.session.RedirectToOriginalUrlAuthenticationSuccessHandler;

@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true)
@Import({ SecurityProblemSupport.class, PermissionsConfiguration.class, OAuthAutoConfiguration.class,
		JWTAutoConfiguration.class, BasicAuthAutoConfiguration.class, AnonymousAuthAutoConfiguration.class, AuthorizationAutoConfiguration.class })
public class SproutSecurityAutoConfiguration {

	@Autowired
	private SproutConfigurationProperties props;
	
	@Bean
	public AuthenticationManager authenticationManager(SproutWebSecurityConfiguration securityConfig) throws Exception {
		return securityConfig.authenticationManagerBean();
	}

	@Bean
	public SproutWebSecurityConfiguration sproutWebSecurityConfiguration(UserDetailsService userDetailsService,
			SecurityProblemSupport problemSupport, List<SecurityCustomizer> securityCustomizers,
			SproutConfigurationProperties sproutConfig, CookieSecurityContextRepository cookieSecurityContextRepository,
			LoginWithTargetUrlAuthenticationEntryPoint loginWithTargetUrlAuthenticationEntryPoint,
			RedirectToOriginalUrlAuthenticationSuccessHandler redirectToOriginalUrlAuthenticationSuccessHandler) {
		return new SproutWebSecurityConfiguration(sproutConfig, problemSupport,
				securityCustomizers, cookieSecurityContextRepository, loginWithTargetUrlAuthenticationEntryPoint,
				redirectToOriginalUrlAuthenticationSuccessHandler);
	}
	
	@Bean
	public RedirectToOriginalUrlAuthenticationSuccessHandler redirectToOriginalUrlAuthenticationSuccessHandler() {
		return new RedirectToOriginalUrlAuthenticationSuccessHandler();
	}
	
	@Bean
	public LoginWithTargetUrlAuthenticationEntryPoint loginWithTargetUrlAuthenticationEntryPoint() {
		return new LoginWithTargetUrlAuthenticationEntryPoint();
	}

	@Bean
	public CookieSecurityContextRepository securityContextRepository(SproutUserService userService) {
		return new CookieSecurityContextRepository(props.getSecurity().getCookieHmacKey(), userService);
	}

	@Bean({"userDetailsService", PermissionAwareSproutUserService.BEAN_NAME})
	public SproutUserService sproutUserDetailsService(UserRepository userRepository,
			EmailAddressRepository emailAddressRepository, PermissionProvider permissionProvider,
			RoleRepository roleRepository, PasswordEncoder passwordEncoder) {

		SproutUserServiceImpl userDetailsService = new SproutUserServiceImpl(userRepository, emailAddressRepository,
				roleRepository, passwordEncoder);
		PermissionAwareSproutUserService permissionAwareUserDetailsService = new PermissionAwareSproutUserService(
				userDetailsService, permissionProvider);
		return permissionAwareUserDetailsService;
	}

	@Bean
	public SproutPasswordEncoder sproutPasswordEncoder() {
		return new SproutPasswordEncoder();
	}

	@Bean
	public UserPersistenceListener userPersistenceListener(PasswordEncoder pwEncoder) {
		return new UserPersistenceListener(pwEncoder);
	}

	@Bean
	public SproutAuditorAware sproutAuditorAware() {
		return new SproutAuditorAware();
	}

}
