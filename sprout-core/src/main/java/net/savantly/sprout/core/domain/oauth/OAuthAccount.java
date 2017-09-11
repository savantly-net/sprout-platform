package net.savantly.sprout.core.domain.oauth;

import javax.persistence.Entity;

import net.savantly.sprout.core.domain.PersistedModule;

@Entity
public class OAuthAccount extends PersistedModule{

	private String provider;
	private String token;
	
	public OAuthAccount(){}
	
	public OAuthAccount(String provider, String token) {
		this.provider = provider;
		this.token = token;
	}
	
	public String getProvider() {
		return provider;
	}
	public void setProvider(String provider) {
		this.provider = provider;
	}
	public String getToken() {
		return token;
	}
	public void setToken(String token) {
		this.token = token;
	}
}