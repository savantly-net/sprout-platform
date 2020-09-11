package net.savantly.sprout.starter;

import java.io.IOException;
import java.util.List;

import javax.servlet.Filter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.zalando.problem.spring.web.advice.security.SecurityProblemSupport;

import net.savantly.sprout.starter.security.SecurityCustomizer;

@EnableWebSecurity
public class SproutWebSecurityConfiguration extends WebSecurityConfigurerAdapter{

    private final SecurityProblemSupport problemSupport;
	private Filter anonymousFilter;
	private final List<SecurityCustomizer> securityCustomizers;
	
	public SproutWebSecurityConfiguration(Filter anonymousFilter, SecurityProblemSupport problemSupport, List<SecurityCustomizer> securityCustomizers) {
		super();
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
            .antMatchers("/api/repo/**").authenticated()
            .antMatchers("/admin", "/admin/**").authenticated()
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
        //.oauth2ResourceServer().jwt().and().and()
        	// adds a default role for anonymous users
        	//.addFilterBefore(anonymousFilter , BasicAuthenticationFilter.class)
           // .apply(jwtConfigurer)
        ;
		
		for (SecurityCustomizer securityCustomizer : securityCustomizers) {
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
