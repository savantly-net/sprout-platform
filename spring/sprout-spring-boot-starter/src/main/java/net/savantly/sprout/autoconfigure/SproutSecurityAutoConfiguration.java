package net.savantly.sprout.autoconfigure;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.Filter;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.security.oauth2.resource.UserInfoTokenServices;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.OAuth2ClientContext;
import org.springframework.security.oauth2.client.filter.OAuth2ClientAuthenticationProcessingFilter;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableOAuth2Client;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.web.filter.CompositeFilter;

import net.savantly.sprout.core.domain.emailAddress.repository.EmailAddressRepository;
import net.savantly.sprout.core.domain.user.repository.UserRepository;
import net.savantly.sprout.core.security.SproutAuditorAware;
import net.savantly.sprout.core.security.SproutPasswordEncoder;
import net.savantly.sprout.core.security.SproutUserDetailsService;
import net.savantly.sprout.core.security.SproutUserDetailsServiceImpl;
import net.savantly.sprout.oauth.ClientResources;
import net.savantly.sprout.oauth.GithubPrincipalExtractor;
import net.savantly.sprout.oauth.LinkedinPrincipalExtractor;
import net.savantly.sprout.security.CustomAnonymousFilter;
import net.savantly.sprout.starter.SproutWebSecurityConfiguration;

@Configuration
@EnableOAuth2Client
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SproutSecurityAutoConfiguration {

	@Bean
	public AuthenticationManager authenticationManager(SproutWebSecurityConfiguration securityConfig) throws Exception {
		return securityConfig.authenticationManagerBean();
	}

	@Bean
	public SproutWebSecurityConfiguration sproutWebSecurityConfiguration(UserDetailsService userDetailsService,
			@Qualifier("oauth2ClientContextFilter") Filter oauthFilter, PasswordEncoder passwordEncoder,
			@Qualifier("githubClient") ClientResources gitHubResources,
			@Qualifier("linkedinClient") ClientResources linkedInResources) {
		Filter ssoFilter = ssoFilter(gitHubResources, linkedInResources);
		return new SproutWebSecurityConfiguration(userDetailsService, ssoFilter, oauthFilter, passwordEncoder,
				getAnonymousFilter(userDetailsService));
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

	@Bean(name = "githubClient")
	@ConfigurationProperties("github")
	ClientResources github(OAuth2ClientContext oauth2ClientContext, UserRepository userRepository) {
		ClientResources resources = new ClientResources(oauth2ClientContext);
		resources.setPrincipalExtractor(new GithubPrincipalExtractor(userRepository, resources.getRestTemplate()));
		return resources;
	}

	@Bean(name = "linkedinClient")
	@ConfigurationProperties("linkedin")
	ClientResources linkedin(OAuth2ClientContext oauth2ClientContext, UserRepository userRepository,
			SproutUserDetailsService userDetailsService) {
		ClientResources resources = new ClientResources(oauth2ClientContext);
		resources.setPrincipalExtractor(
				new LinkedinPrincipalExtractor(userRepository, userDetailsService, resources.getRestTemplate()));
		return resources;
	}

	private Filter getAnonymousFilter(UserDetailsService userDetailsService) {
		return new CustomAnonymousFilter(userDetailsService);
	}

	// @Bean(name="ssoFilter")
	private Filter ssoFilter(@Qualifier("githubClient") ClientResources gitHubResources,
			@Qualifier("linkedinClient") ClientResources linkedInResources) {
		CompositeFilter filter = new CompositeFilter();
		List<Filter> filters = new ArrayList<>();
		/* filters.add(ssoFilter(facebook(), "/login/facebook")); */
		filters.add(ssoFilter(gitHubResources, "/login/github"));
		filters.add(ssoFilter(linkedInResources, "/login/linkedin"));
		filter.setFilters(filters);
		return filter;
	}

	private Filter ssoFilter(ClientResources client, String path) {
		UserInfoTokenServices userInfoTokenServices = new UserInfoTokenServices(client.getResource().getUserInfoUri(),
				client.getClient().getClientId());
		userInfoTokenServices.setPrincipalExtractor(client.getPrincipalExtractor());
		OAuth2ClientAuthenticationProcessingFilter filter = new OAuth2ClientAuthenticationProcessingFilter(path);
		filter.setRestTemplate(client.getRestTemplate());
		filter.setTokenServices(userInfoTokenServices);
		return filter;
	}

}
