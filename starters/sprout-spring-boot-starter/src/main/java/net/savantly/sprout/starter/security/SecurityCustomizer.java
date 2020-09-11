package net.savantly.sprout.starter.security;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;

public interface SecurityCustomizer {
	
	void configure(HttpSecurity http) throws Exception;

}
