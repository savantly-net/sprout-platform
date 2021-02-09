package net.savantly.sprout.autoconfigure.properties;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.http.HttpMethod;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;
import net.savantly.sprout.domain.branding.StyleMap;
import net.savantly.sprout.domain.menu.MenuDto;
import net.savantly.sprout.domain.uiProperties.UIProperty;
import net.savantly.sprout.starter.security.permissions.BootstrapPermission;

@Getter
@Setter
@ConfigurationProperties(prefix = "sprout")
public class SproutConfigurationProperties {
	
	private Branding branding = new Branding();
	private Dashboards dashboards = new Dashboards();
	private List<MenuDto> menus = new ArrayList<>();
	private Security security = new Security();
	private Jpa jpa = new Jpa();
	private Cors cors = new Cors();
	private Mvc mvc = new Mvc();
	private Problem problem = new Problem();
	private Hal hal = new Hal();
	private Files files = new Files();
	private Proxy proxy = new Proxy();
	
	/**
	 * Additional UI properties that should be created for the default tenant
	 */
	private List<UIProperty> uiProperties = new ArrayList<>(); 
	
	@Getter @Setter
	public static class Branding {
		private String faviconUrl = "/api/public/brand/favicon";
		private String faviconResource = "classpath:/META-INF/resources/images/favicon.png";
		private String logoUrl = "/api/public/brand/logo";
		private String logoResource = "classpath:/META-INF/resources/images/logo.png";
		private String miniLogoUrl = "/api/public/brand/mini-logo";
		private String miniLogoResource = "classpath:/META-INF/resources/images/favicon.png";
		private StyleMap styles = new StyleMap();
	}
	
	@Getter	@Setter
	public static class Dashboards {
		private String home = "classpath:/META-INF/dashboards/home.json";
		private boolean enableMenuItems = true;
	}
	
	@Getter
	@Setter
	public static class Security {
		private Authentication authentication = new Authentication();
		private Authorization authorization = new Authorization();
		/**
		 * This is generated every time the application restarts. When it changes, all issued cookies are invalidated.
		 * It should be set in the application properties, and shared across all app instances
		 */
		private String cookieHmacKey = UUID.randomUUID().toString().replace("-", "");
		private int cookieDurationHours = 8;
    }
	
	@Getter
	@Setter
	public static class Authorization {
		/**
		 * Applied first, before patterns and authenticated-paths
		 */
		private List<String> publicPaths = Arrays.asList("/api/ui-properties", "/api/authentication/oauth", "/images/**");
		
		/**
		 * Applied second, after the public-paths
		 */
		final static Map<HttpMethod, String> expression = new HashMap<HttpMethod, String>();
		static {
			expression.put(HttpMethod.GET, "permitAll");
		}
		private List<AuthorizationPattern> patterns = Arrays.asList(
				new AuthorizationPattern().setPath("/api/plugins**").setExpression(expression),
				new AuthorizationPattern().setPath("/api/dashboards**").setExpression(expression)
				);
		/**
		 * Applied third [last], to handle paths that aren't designated public, or previously matched pattern
		 */
		private List<String> authenticatedPaths = Arrays.asList("/api/**");

		/**
		 * If true, ensure the default permissions exist on application startup
		 */
		private boolean applyDefaultPermissions = true;

		/**
		 * Additional permissions to bootstrap on application startup.
		 */
		private List<BootstrapPermission> bootstrapPermissions = Arrays.asList(new BootstrapPermission("ADMIN", Arrays.asList("GENERAL_ADMIN")));
	}

	
	
	@Getter
	@Setter
	@Accessors(chain = true)
	public static class AuthorizationPattern {
		private String path;
		private Map<HttpMethod, String> expression;
	}
	
	@Getter
	@Setter
	public static class OAuth {
		private boolean autoCreateUsers = true;
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
		private boolean autoLogin;
		private OAuthFlowType flowType;
	}

	@Getter
	@Setter
	public static class Authentication {
		private Jwt jwt = new Jwt();
		private OAuth oauth = new OAuth();
		private Basic basic = new Basic();
		private Anonymous anonymous = new Anonymous();
	}
	
	@Getter
	@Setter
	public static class Anonymous {
		private boolean enable = true;
		private List<String> roles = Arrays.asList("ANONYMOUS");
	}
	
	@Getter
	@Setter
	public static class Basic {
		private boolean enable = true;
		private List<BasicCreds> users = new ArrayList<>();
	}
	
	@Getter
	@Setter
	public static class BasicCreds {
		private String username;
		private String password;
		private String emailAddress;
		private List<String> roles = new ArrayList<String>();
		
		BasicCreds(){}
		
		BasicCreds(String username, String password, String emailAddress, Collection<String> roles) {
			this.username = username;
			this.password = password;
			this.emailAddress = emailAddress;
			this.roles.addAll(roles);
		}
	}
	
	/*
	 * default secret should be overridden when deployed
	 */
	@Getter
	@Setter
	public static class Jwt {
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

	@Getter
	@Setter
	public static class Hal {
		private boolean enable = false;
	}
	
	@Getter
	@Setter
	public static class Files {
		private String providerName = "jpaFileProvider";
		private S3 s3 = new S3();
	}
	
	@Getter
	@Setter
	public static class S3 {
		private String region = "us-east-2";
		private String bucketName;
	}
	
	@Getter
	@Setter
	public static class Proxy {
		private List<String> allowedUris = new ArrayList<>();
	}
}
