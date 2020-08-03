package net.savantly.sprout.autoconfigure.properties;

import org.springframework.boot.context.properties.ConfigurationProperties;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ConfigurationProperties(prefix = "sprout")
public class SproutConfigurationProperties {
	
	private Security security = new Security();
	
	@Getter
	@Setter
	public static class Security {
		private Authentication authentication = new Authentication();
    }

	@Getter
	@Setter
	public static class Authentication {
		private Jwt jwt = new Jwt();
	}
	
	/*
	 * default secret should be overridden when deployed
	 */
	@Getter
	@Setter
	public static class Jwt {
    	private String secret = "UseThebAse64SecreTformOreSecurity!";
    	private String base64Secret = "NDkxYWFlYzJkMDk4Mjk4OTdkMGU5MWQ5MTEwZGZkMjQxYTdkNGYzNGQ3"
    			+ "OWI5YzQ2OTA2OGQwYWQxNWVjZWUwMDk3NDA1NjU1YWIxMjE2MTc5YWFjMmVjZGY0NTJhOGZlOTg4O"
    			+ "DgwYjBlM2Y5ZTE5NDY2MDZkMGE5Y2Y5MmVlOTY";
    	private long tokenValidityInSeconds = 86400;
        private long tokenValidityInSecondsForRememberMe = 2592000;
	}
}
