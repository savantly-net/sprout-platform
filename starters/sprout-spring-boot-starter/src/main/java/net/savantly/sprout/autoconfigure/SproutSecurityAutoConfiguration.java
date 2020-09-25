package net.savantly.sprout.autoconfigure;

import java.util.List;

import javax.servlet.Filter;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.zalando.problem.spring.web.advice.security.SecurityProblemSupport;

import net.savantly.authorization.service.PermissionAwareUserDetailsService;
import net.savantly.authorization.service.PermissionProvider;
import net.savantly.sprout.autoconfigure.properties.SproutConfigurationProperties;
import net.savantly.sprout.core.domain.emailAddress.repository.EmailAddressRepository;
import net.savantly.sprout.core.domain.user.repository.UserPersistenceListener;
import net.savantly.sprout.core.domain.user.repository.UserRepository;
import net.savantly.sprout.core.security.SproutAuditorAware;
import net.savantly.sprout.core.security.SproutPasswordEncoder;
import net.savantly.sprout.core.security.SproutUserDetailsServiceImpl;
import net.savantly.sprout.starter.SproutWebSecurityConfiguration;
import net.savantly.sprout.starter.security.CustomAnonymousFilter;
import net.savantly.sprout.starter.security.SecurityCustomizer;
import net.savantly.sprout.starter.security.jwt.JWTAutoConfiguration;
import net.savantly.sprout.starter.security.permissions.PermissionsConfiguration;

@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true)
@Import({
	SecurityProblemSupport.class, 
	PermissionsConfiguration.class,
	JWTAutoConfiguration.class})
public class SproutSecurityAutoConfiguration {

	@Bean
	public AuthenticationManager authenticationManager(SproutWebSecurityConfiguration securityConfig) throws Exception {
		return securityConfig.authenticationManagerBean();
	}

	@Bean
	public SproutWebSecurityConfiguration sproutWebSecurityConfiguration(
			UserDetailsService userDetailsService, SecurityProblemSupport problemSupport, List<SecurityCustomizer> securityCustomizers, 
			SproutConfigurationProperties sproutConfig) {
		return new SproutWebSecurityConfiguration(sproutConfig,
				getAnonymousFilter(userDetailsService), problemSupport, securityCustomizers);
	}

	@Bean
	public HttpSessionSecurityContextRepository securityContextRepository() {
		return new HttpSessionSecurityContextRepository();
	}

	@Bean("userDetailsService")
	public UserDetailsService sproutUserDetailsService(UserRepository userRepository,
			EmailAddressRepository emailAddressRepository, PermissionProvider permissionProvider) {

		SproutUserDetailsServiceImpl userDetailsService = new SproutUserDetailsServiceImpl(userRepository, emailAddressRepository);
		PermissionAwareUserDetailsService permissionAwareUserDetailsService = 
				new PermissionAwareUserDetailsService(userDetailsService, permissionProvider);
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

	private Filter getAnonymousFilter(UserDetailsService userDetailsService) {
		return new CustomAnonymousFilter(userDetailsService);
	}
}
