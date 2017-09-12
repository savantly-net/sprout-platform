package net.savantly.sprout.oauth;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

import org.springframework.boot.autoconfigure.security.oauth2.resource.PrincipalExtractor;
import org.springframework.security.oauth2.client.OAuth2RestTemplate;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import net.savantly.sprout.core.domain.emailAddress.EmailAddress;
import net.savantly.sprout.core.domain.oauth.OAuthAccount;
import net.savantly.sprout.core.domain.user.SproutUser;
import net.savantly.sprout.core.domain.user.repository.UserRepository;
import net.savantly.sprout.core.security.SproutUserDetailsService;

public class LinkedinPrincipalExtractor implements PrincipalExtractor {
	
	private UserRepository userRepository;
	private OAuth2RestTemplate restTemplate;
	private SproutUserDetailsService userDetailsService;
	private ObjectMapper objectMapper = new ObjectMapper();

	public LinkedinPrincipalExtractor(UserRepository userRepository, SproutUserDetailsService userDetailsService, OAuth2RestTemplate oAuth2RestTemplate) {
		this.userRepository = userRepository;
		this.restTemplate = oAuth2RestTemplate;
		this.userDetailsService = userDetailsService;
	}
	
	@Override
	public Object extractPrincipal(Map<String, Object> authMap) {
		
		String emailString = (String)authMap.get("emailAddress");
		List<EmailAddress> emailList = Arrays.asList(new EmailAddress((String) emailString, false));
		String firstName = (String) authMap.getOrDefault("firstName", "Linkedin");
		String lastName = (String) authMap.getOrDefault("lastName", "User");
		OAuthAccount oAuthAccount = null;
		try {
			oAuthAccount = new OAuthAccount("linkedin", objectMapper.writeValueAsString(authMap));
		} catch (JsonProcessingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		SproutUser user = userDetailsService.loadByEmailAddress(emailString.toLowerCase());
		
		if(user == null){
			return this.userRepository.getOrInsertForOAuth(firstName, lastName, oAuthAccount, emailList);
		}
		else {
			return user;
		}
		
	}
}