package net.savantly.sprout.starter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.zalando.problem.spring.web.advice.security.SecurityProblemSupport;

import net.savantly.sprout.security.JWTConfigurer;
import net.savantly.sprout.security.TokenProvider;

@EnableWebSecurity
public class SproutWebSecurityConfiguration extends WebSecurityConfigurerAdapter{

    private final TokenProvider tokenProvider;
    private final SecurityProblemSupport problemSupport;
	private Filter anonymousFilter;
	
	public SproutWebSecurityConfiguration(Filter anonymousFilter,
			TokenProvider tokenProvider, SecurityProblemSupport problemSupport) {
		super();
        this.anonymousFilter = anonymousFilter;
        this.tokenProvider = tokenProvider;
        this.problemSupport = problemSupport;
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
        	// adds a default role for anonymous users
        	.addFilterBefore(anonymousFilter , BasicAuthenticationFilter.class)
            .apply(securityConfigurerAdapter())
        ;
	}

	private JWTConfigurer securityConfigurerAdapter() {
        return new JWTConfigurer(tokenProvider);
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
