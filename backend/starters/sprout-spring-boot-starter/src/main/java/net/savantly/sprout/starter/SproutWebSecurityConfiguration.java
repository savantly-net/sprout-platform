package net.savantly.sprout.starter;

import java.io.IOException;
import java.util.Comparator;
import java.util.List;

import javax.servlet.Filter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.zalando.problem.spring.web.advice.security.SecurityProblemSupport;

import net.savantly.sprout.autoconfigure.properties.SproutConfigurationProperties;
import net.savantly.sprout.starter.security.SecurityCustomizer;

@EnableWebSecurity
public class SproutWebSecurityConfiguration extends WebSecurityConfigurerAdapter{

	private final static Logger log = LoggerFactory.getLogger(SproutWebSecurityConfiguration.class);
	private final SproutConfigurationProperties configProps;
    private final SecurityProblemSupport problemSupport;
	private final Filter anonymousFilter;
	private final List<SecurityCustomizer> securityCustomizers;
	
	public SproutWebSecurityConfiguration(SproutConfigurationProperties configProps, Filter anonymousFilter, SecurityProblemSupport problemSupport, List<SecurityCustomizer> securityCustomizers) {
		super();
		this.configProps = configProps;
        this.anonymousFilter = anonymousFilter;
        this.problemSupport = problemSupport;
        this.securityCustomizers = securityCustomizers;
	}

	@Override
 	public void configure(WebSecurity web) throws Exception {
 		web.ignoring()
 			.antMatchers("/", "/**.*", "/swagger-ui/**");
 		web.debug(true);
 	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {

		http
        	.headers()
        	.frameOptions().disable()
        .and()
            .authorizeRequests()
            .antMatchers("/api/login").permitAll()
            .antMatchers(configProps.getSecurity().getPublicPaths().toArray(new String[0])).permitAll()
            .antMatchers(configProps.getSecurity().getAuthenticatedPaths().toArray(new String[0])).authenticated()
        .and()
            .logout()
            	.logoutSuccessHandler(logoutSuccessHandler())
                .permitAll()
        .and()
            .csrf().disable()
            .cors().and().rememberMe()
        .and()
        	.exceptionHandling()
            .accessDeniedHandler(problemSupport)
        	//.accessDeniedPage("/errors/403")
        .and()
        	.anonymous().authorities(configProps.getSecurity().getAnonymousAuthorities().toArray(new String[0]))
        //.oauth2ResourceServer().jwt().and().and()
        	// adds a default role for anonymous users
        	//.addFilterBefore(anonymousFilter , BasicAuthenticationFilter.class)
           // .apply(jwtConfigurer)
        ;
		
		// Sort by priority
		securityCustomizers.sort(Comparator.comparing(SecurityCustomizer::getPriority));
		
		for (SecurityCustomizer securityCustomizer : securityCustomizers) {
			log.info("configuring with SecurityCustomizer: {}", securityCustomizer.getClass().getName());
			securityCustomizer.configure(http);
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
}
