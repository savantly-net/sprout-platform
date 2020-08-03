package net.savantly.sprout.autoconfigure;

import javax.servlet.Filter;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.zalando.problem.spring.web.advice.security.SecurityProblemSupport;

import net.savantly.sprout.autoconfigure.properties.SproutConfigurationProperties;
import net.savantly.sprout.core.domain.emailAddress.repository.EmailAddressRepository;
import net.savantly.sprout.core.domain.user.repository.UserRepository;
import net.savantly.sprout.core.security.SproutAuditorAware;
import net.savantly.sprout.core.security.SproutPasswordEncoder;
import net.savantly.sprout.core.security.SproutUserDetailsService;
import net.savantly.sprout.core.security.SproutUserDetailsServiceImpl;
import net.savantly.sprout.security.CustomAnonymousFilter;
import net.savantly.sprout.security.TokenProvider;
import net.savantly.sprout.starter.SproutWebSecurityConfiguration;

@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true)
@Import(SecurityProblemSupport.class)
public class SproutSecurityAutoConfiguration {

	@Bean
	public AuthenticationManager authenticationManager(SproutWebSecurityConfiguration securityConfig) throws Exception {
		return securityConfig.authenticationManagerBean();
	}

	@Bean
	public SproutWebSecurityConfiguration sproutWebSecurityConfiguration(
			UserDetailsService userDetailsService, TokenProvider tokenProvider, SecurityProblemSupport problemSupport) {
		return new SproutWebSecurityConfiguration(
				getAnonymousFilter(userDetailsService), tokenProvider, problemSupport);
	}

	@Bean
	public HttpSessionSecurityContextRepository securityContextRepository() {
		return new HttpSessionSecurityContextRepository();
	}

	@Bean("userDetailsService")
	public SproutUserDetailsService sproutUserDetailsService(UserRepository userRepository,
			EmailAddressRepository emailAddressRepository) {
		return new SproutUserDetailsServiceImpl(userRepository, emailAddressRepository);
	}

	@Bean
	public SproutPasswordEncoder sproutPasswordEncoder() {
		return new SproutPasswordEncoder();
	}

	@Bean
	public SproutAuditorAware sproutAuditorAware() {
		return new SproutAuditorAware();
	}
	
	@Bean
	public TokenProvider tokenProvider(SproutConfigurationProperties sproutProperties) {
		return new TokenProvider(sproutProperties);
	}

	private Filter getAnonymousFilter(UserDetailsService userDetailsService) {
		return new CustomAnonymousFilter(userDetailsService);
	}
}
