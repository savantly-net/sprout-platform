package net.savantly.sprout.autoconfigure.properties;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.boot.context.properties.ConfigurationProperties;

import lombok.Getter;
import lombok.Setter;
import net.savantly.sprout.domain.uiProperties.UIProperty;

@Getter
@Setter
@ConfigurationProperties(prefix = "sprout")
public class SproutConfigurationProperties {
	
	private Dashboards dashboards = new Dashboards();
	private Security security = new Security();
	private Jpa jpa = new Jpa();
	private Cors cors = new Cors();
	private Mvc mvc = new Mvc();
	private Problem problem = new Problem();
	private Hal hal = new Hal();
	
	/**
	 * Additional UI properties that should be created for the default tenant
	 */
	private List<UIProperty> uiProperties = new ArrayList<>(); 
	
	@Getter	@Setter
	public static class Dashboards {
		private String home = "classpath:/META-INF/dashboards/home.json";
	}
	
	@Getter
	@Setter
	public static class Security {
		private Authentication authentication = new Authentication();
		private List<String> anonymousAuthorities = Arrays.asList("ANONYMOUS");
		private List<String> publicPaths = Arrays.asList("/api/ui-properties", "/api/authentication/oauth");
		private List<String> authenticatedPaths = Arrays.asList("/api/repo/**", "/v3/**", "/admin/**");
		private OAuth oauth = new OAuth();
    }
	
	@Getter
	@Setter
	public static class OAuth {
		private List<OAuthClientConfig> clients = new ArrayList<>();
	}
	
	public static enum OAuthFlowType {
		IMPLICIT,
		STANDARD
	}
	
	@Getter
	@Setter
	public static class OAuthClientConfig {
		private String name;
		private String displayName;
		private String issuerUri;
		private String clientId;
		private String clientSecret;
		private String scope;
		private String authorizationUrl;
		private String redirectUrl;
		private String tokenUrl;
		private String userInfoUrl;
		private String jwksUrl;
		private OAuthFlowType flowType;
	}

	@Getter
	@Setter
	public static class Authentication {
		private Jwt jwt = new Jwt();
		private OAuth oauth = new OAuth();
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
        private String jwkSetUri;
        private String groupsClaim = "groups";
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
	
	@Getter
	@Setter
	public static class Problem {
		private boolean enableTrace = false;
	}

	
	/** NOT IMPLEMENTED **/
	@Getter
	@Setter
	public static class Hal {
		private boolean enable = false;
	}
}
