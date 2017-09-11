package net.savantly.sprout.oauth;

import org.springframework.boot.autoconfigure.security.oauth2.resource.PrincipalExtractor;
import org.springframework.boot.autoconfigure.security.oauth2.resource.ResourceServerProperties;
import org.springframework.security.oauth2.client.OAuth2ClientContext;
import org.springframework.security.oauth2.client.OAuth2RestTemplate;
import org.springframework.security.oauth2.client.resource.OAuth2ProtectedResourceDetails;
import org.springframework.security.oauth2.client.token.grant.code.AuthorizationCodeResourceDetails;

public class ClientResources {
	private OAuth2ProtectedResourceDetails client = new AuthorizationCodeResourceDetails();
	private ResourceServerProperties resource = new ResourceServerProperties();
	private OAuth2ClientContext oauth2ClientContext;
	private PrincipalExtractor principalExtractor;
	
	public ClientResources(OAuth2ClientContext oauth2ClientContext){
		this.oauth2ClientContext = oauth2ClientContext;
	}

	public OAuth2ProtectedResourceDetails getClient() {
		return client;
	}

	public ResourceServerProperties getResource() {
		return resource;
	}
	
	public OAuth2RestTemplate getRestTemplate(){
		return new OAuth2RestTemplate(this.client, oauth2ClientContext);
	}

	public PrincipalExtractor getPrincipalExtractor() {
		return principalExtractor;
	}

	public void setPrincipalExtractor(PrincipalExtractor principalExtractor) {
		this.principalExtractor = principalExtractor;
	}
	
}