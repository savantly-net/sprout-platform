package net.savantly.sprout.starter;

import java.io.IOException;
import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Import;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.authentication.DelegatingAuthenticationEntryPoint;
import org.springframework.security.web.authentication.Http403ForbiddenEntryPoint;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.security.web.util.matcher.RequestHeaderRequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatcher;
import org.zalando.problem.spring.web.advice.security.SecurityProblemSupport;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import net.savantly.sprout.autoconfigure.properties.SproutConfigurationProperties;
import net.savantly.sprout.starter.security.SecurityCustomizer;
import net.savantly.sprout.starter.security.acls.AclMethodSecurityConfiguration;
import net.savantly.sprout.starter.security.session.CookieSecurityContextRepository;
import net.savantly.sprout.starter.security.session.LoginWithTargetUrlAuthenticationEntryPoint;
import net.savantly.sprout.starter.security.session.RedirectToOriginalUrlAuthenticationSuccessHandler;
import net.savantly.sprout.starter.security.session.SignedUserInfoCookie;

@EnableWebSecurity
@Import(AclMethodSecurityConfiguration.class)
public class SproutWebSecurityConfiguration extends WebSecurityConfigurerAdapter{

	private final static Logger log = LoggerFactory.getLogger(SproutWebSecurityConfiguration.class);
	private final SproutConfigurationProperties configProps;
    private final SecurityProblemSupport problemSupport;
	private final List<SecurityCustomizer> securityCustomizers;
	
	private final SecurityContextRepository cookieSecurityContextRepository;
	private final LoginWithTargetUrlAuthenticationEntryPoint loginWithTargetUrlAuthenticationEntryPoint;
	private final RedirectToOriginalUrlAuthenticationSuccessHandler redirectToOriginalUrlAuthenticationSuccessHandler;
	  

	public static final String LOGIN_FORM_URL = "/login";
	public static final String TARGET_AFTER_SUCCESSFUL_LOGIN_PARAM = "target";
	
	public SproutWebSecurityConfiguration(
			SproutConfigurationProperties configProps, 
			SecurityProblemSupport problemSupport, 
			List<SecurityCustomizer> securityCustomizers,
			CookieSecurityContextRepository cookieSecurityContextRepository,
			LoginWithTargetUrlAuthenticationEntryPoint loginWithTargetUrlAuthenticationEntryPoint,
			RedirectToOriginalUrlAuthenticationSuccessHandler redirectToOriginalUrlAuthenticationSuccessHandler) {
		super();
		this.configProps = configProps;
        this.problemSupport = problemSupport;
        this.securityCustomizers = securityCustomizers;
        this.cookieSecurityContextRepository = (SecurityContextRepository) cookieSecurityContextRepository;
        this.loginWithTargetUrlAuthenticationEntryPoint = loginWithTargetUrlAuthenticationEntryPoint;
        this.redirectToOriginalUrlAuthenticationSuccessHandler = redirectToOriginalUrlAuthenticationSuccessHandler;
	}

	@Override
 	public void configure(WebSecurity web) throws Exception {
 		web.ignoring()
 			.antMatchers("/", "/**.*", "/swagger-ui/**");
 		web.debug(true);
 	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		
		logSettings();

		http
        	.headers()
        	.frameOptions().disable()
        .and()
	     	// store SecurityContext in Cookie / delete Cookie on logout
	        .securityContext().securityContextRepository(cookieSecurityContextRepository)
	     
	    .and()
	        // configure form-based login
	        .formLogin()
	        .loginPage(LOGIN_FORM_URL)
	        // after successful login forward user to originally requested URL
	        .successHandler(redirectToOriginalUrlAuthenticationSuccessHandler)
	    .and()
            .logout()
            	.logoutSuccessHandler(logoutSuccessHandler())
                .permitAll()
                .deleteCookies(SignedUserInfoCookie.NAME)
        .and()
        	// deactivate session creation
        	.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        .and()
            .csrf().disable() //NOSONAR
            .cors().and().rememberMe()
        //.and()
        	// deactivate RequestCache and append originally requested URL as query parameter to login form request
            //.requestCache().disable()
        ;
		
		// Sort by priority
		securityCustomizers.sort(Comparator.comparing(SecurityCustomizer::getPriority));
		
		for (SecurityCustomizer securityCustomizer : securityCustomizers) {
			log.info("configuring with SecurityCustomizer: {}", securityCustomizer.getClass().getName());
			securityCustomizer.configure(http);
		}
		
	}
	
	private void logSettings() {
		ObjectMapper mapper = new ObjectMapper();
		try {
			log.debug("using security settings: {}", mapper.writeValueAsString(this.configProps.getSecurity()));
		} catch (JsonProcessingException e) {
			throw new RuntimeException("failed to parse security configuration", e);
		}
		
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
	
	// not using currently - I think Spring Boot's default authentication entry point is sufficient
	DelegatingAuthenticationEntryPoint authenticationEntryPoint() {
		LinkedHashMap<RequestMatcher, AuthenticationEntryPoint> matchers = new LinkedHashMap<RequestMatcher, AuthenticationEntryPoint>();
		
		// send 403 instead of redirection
		matchers.put(new RequestHeaderRequestMatcher("X-Requested-With"), new Http403ForbiddenEntryPoint());
		
		DelegatingAuthenticationEntryPoint entryPoint = new DelegatingAuthenticationEntryPoint(matchers);
		entryPoint.setDefaultEntryPoint(loginWithTargetUrlAuthenticationEntryPoint);
		
		return entryPoint;
	}
}
