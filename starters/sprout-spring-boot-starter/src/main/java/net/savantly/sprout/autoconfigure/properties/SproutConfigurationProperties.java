package net.savantly.sprout.autoconfigure.properties;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.boot.context.properties.ConfigurationProperties;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ConfigurationProperties(prefix = "sprout")
public class SproutConfigurationProperties {
	
	private Security security = new Security();
	private Jpa jpa = new Jpa();
	private Cors cors = new Cors();
	private Mvc mvc = new Mvc();
	
	@Getter
	@Setter
	public static class Security {
		private Authentication authentication = new Authentication();
    }

	@Getter
	@Setter
	public static class Authentication {
		private Jwt jwt = new Jwt();
		private Oidc oidc = new Oidc();
	}
	
	@Getter
	@Setter
	/** NOT USED YET **/
	public static class Oidc {
		private String issuerUri;
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
        /** NOT USED YET **/
        private String jwkSetUri;
	}
	
	@Getter
	@Setter
	public static class Jpa {
		private List<String> packagesToScan = new ArrayList<>();
	}
	
	@Getter
	@Setter
	public static class Cors {
		private boolean allowCredentials = true;
		private String[] allowedMethods = Arrays.asList("GET", "OPTIONS", "PUT", "POST", "PATCH", "DELETE").toArray(new String[0]);
		private String[] allowedHeaders = Arrays.asList("*").toArray(new String[0]);
		private String[] allowedOrigins = Arrays.asList("*").toArray(new String[0]);
	}
	
	@Getter
	@Setter
	public static class Mvc {
		private List<StaticResourceMap> staticResources = new ArrayList<>();
	}
	@Getter
	@Setter
	public static class StaticResourceMap {
		private List<String> patterns = new ArrayList<>();
		private List<String> locations = new ArrayList<>();
	}
}
