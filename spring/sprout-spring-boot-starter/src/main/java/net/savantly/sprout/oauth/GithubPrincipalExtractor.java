package net.savantly.sprout.oauth;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.boot.autoconfigure.security.oauth2.resource.PrincipalExtractor;
import org.springframework.security.oauth2.client.OAuth2RestTemplate;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import net.savantly.sprout.core.domain.emailAddress.EmailAddress;
import net.savantly.sprout.core.domain.oauth.OAuthAccount;
import net.savantly.sprout.core.domain.user.repository.UserRepository;

public class GithubPrincipalExtractor implements PrincipalExtractor {
	
	private UserRepository userRepository;
	private OAuth2RestTemplate restTemplate;
	private ObjectMapper objectMapper = new ObjectMapper();

	public GithubPrincipalExtractor(UserRepository userRepository, OAuth2RestTemplate oAuth2RestTemplate) {
		this.userRepository = userRepository;
		this.restTemplate = oAuth2RestTemplate;
	}
	
	@Override
	@SuppressWarnings("unchecked")
	public Object extractPrincipal(Map<String, Object> authMap) {
		List<LinkedHashMap<String, Object>> emailQueryResult = this.restTemplate.getForObject("https://api.github.com/user/emails", List.class);
		 List<EmailAddress> emailList = emailQueryResult.stream()
				.map(u -> new EmailAddress((String) u.get("email"), (Boolean) u.get("verified")))
				.collect(Collectors.toList());
		
		if(emailList.size() == 0){
			return String.format("githubUser: %s", authMap.getOrDefault("userid", "anonymous"));
		}
		
		String firstName = (String) authMap.getOrDefault("name", "githubUser");
		String lastName = "";
		OAuthAccount oAuthAccount = null;
		try {
			oAuthAccount = new OAuthAccount("github", objectMapper.writeValueAsString(authMap));
		} catch (JsonProcessingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return this.userRepository.getOrInsertForOAuth(firstName, lastName, oAuthAccount, emailList);
	}
}