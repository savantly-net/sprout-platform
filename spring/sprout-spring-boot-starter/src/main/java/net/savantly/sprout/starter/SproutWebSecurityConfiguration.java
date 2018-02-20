package net.savantly.sprout.starter;

import java.io.IOException;
import java.util.LinkedHashMap;

import javax.servlet.Filter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.DelegatingAuthenticationEntryPoint;
import org.springframework.security.web.authentication.Http403ForbiddenEntryPoint;
import org.springframework.security.web.authentication.LoginUrlAuthenticationEntryPoint;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.security.web.util.matcher.RegexRequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatcher;

@EnableWebSecurity
public class SproutWebSecurityConfiguration extends WebSecurityConfigurerAdapter{

	private UserDetailsService userDetailsService;
	private Filter ssoFilter;
	private Filter oauth2ClientContextFilter;
	private PasswordEncoder passwordEncoder;
	private Filter anonymousFilter;
	
	public SproutWebSecurityConfiguration(UserDetailsService userDetailsService, Filter ssoFilter,
			Filter oauth2ClientContextFilter, PasswordEncoder passwordEncoder, Filter anonymousFilter) {
		super();
		this.userDetailsService = userDetailsService;
		this.ssoFilter = ssoFilter;
		this.oauth2ClientContextFilter = oauth2ClientContextFilter;
		this.passwordEncoder = passwordEncoder;
        this.anonymousFilter = anonymousFilter;
	}

	@Override
 	public void configure(WebSecurity web) throws Exception {
 		web.ignoring()
 		// Spring Security should completely ignore URLs starting with /resources/
 				.antMatchers("/", "/*.js", "/js/**", "/*.html", "/css/**", "/img/**",  "favicon.ico*", "**/favicon.ico*", "/login", "/login/");
 		web.debug(true);
 	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		DelegatingAuthenticationEntryPoint authenticationEntryPoint = new DelegatingAuthenticationEntryPoint(entryPoints());
        
		authenticationEntryPoint.setDefaultEntryPoint(defaultEntryPoint());

		http
        	.headers()
        		.frameOptions().disable().and()
            .authorizeRequests()
                .antMatchers("/", "/js/**", "/css/**", "/index", "/rest/**", "/api/**", "/ui", "/ui/**", "/login", "/login/").permitAll()
                .antMatchers("/admin", "/admin/**").fullyAuthenticated()
                .and()
            .formLogin()
            	.loginPage("/login")
                .permitAll()
                .successHandler(successHandler())
                .and()
            .logout()
            	.logoutSuccessHandler(logoutSuccessHandler())
                .permitAll()
                .and()
            .csrf()
                .disable()
        	.httpBasic()
        	    .and()
            .exceptionHandling()
        	.accessDeniedPage("/errors/403")
        	.authenticationEntryPoint(authenticationEntryPoint)
        		.and()
        	.addFilterBefore(anonymousFilter , BasicAuthenticationFilter.class)
            .addFilterBefore(oauth2ClientContextFilter, BasicAuthenticationFilter.class)
            .addFilterBefore(ssoFilter, BasicAuthenticationFilter.class);
	}
	

	private LinkedHashMap<RequestMatcher, AuthenticationEntryPoint> entryPoints() {
		LinkedHashMap<RequestMatcher, AuthenticationEntryPoint> entryPoints = new LinkedHashMap<>(2);
		entryPoints.put(restMatcher(), auth403());
		return entryPoints;
	}

	private AuthenticationEntryPoint auth403() {
		return new Http403ForbiddenEntryPoint(); 
	}

	private RequestMatcher restMatcher() {
		return new RegexRequestMatcher("/rest/.*", null);
	}
	
	private RequestMatcher rootRquestMatcher() {
		return new RegexRequestMatcher("/*", null);
	}
	
	private RequestMatcher adminRequestMatcher() {
		return new RegexRequestMatcher("^/admin", null);
	}
	
	@Override
 	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
 		auth.userDetailsService(userDetailsService)
 			.passwordEncoder(passwordEncoder)
 			.and().eraseCredentials(true);
 	}
	
	LogoutSuccessHandler logoutSuccessHandler(){
		return new LogoutSuccessHandler() {
			@Override
			public void onLogoutSuccess(HttpServletRequest req, HttpServletResponse res, Authentication auth)
					throws IOException, ServletException {
				res.setStatus(200);
			}
		};
	}
	
	AuthenticationSuccessHandler successHandler(){
		return new SimpleUrlAuthenticationSuccessHandler("/rest/users/token");
	}
	
	public AuthenticationEntryPoint defaultEntryPoint(){
	    return new LoginUrlAuthenticationEntryPoint("/login");
	}

}
