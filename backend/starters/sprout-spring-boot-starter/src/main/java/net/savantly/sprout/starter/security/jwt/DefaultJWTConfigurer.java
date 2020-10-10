package net.savantly.sprout.starter.security.jwt;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.authentication.AnonymousAuthenticationFilter;

public class DefaultJWTConfigurer implements JWTConfigurer {

    private TokenProvider tokenProvider;

    public DefaultJWTConfigurer(TokenProvider tokenProvider) {
        this.tokenProvider = tokenProvider;
    }

    public void configure(HttpSecurity http) throws Exception {
        JWTFilter customFilter = new JWTFilter(tokenProvider);
        http.addFilterBefore(customFilter, AnonymousAuthenticationFilter.class);
    }
}
