package net.savantly.sprout.module.forms.proxy;

import static net.savantly.sprout.module.forms.proxy.FormioApiUrl.USER_LOGIN;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import lombok.Builder;
import net.savantly.sprout.module.forms.formio.FormioLogin;

@Builder
public class FormioProxy {
	
	private final static Logger log = LoggerFactory.getLogger(FormioProxy.class);
	private final RestTemplate formioClient;
	private final String adminUsername;
	private final String adminPassword;
	
	private <T> HttpEntity <T> createAuthenticatedRequest(T body, String jwt){
		HttpHeaders headers = new HttpHeaders();
		headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
		headers.setContentType(MediaType.APPLICATION_JSON);
		headers.set("x-jwt-token", jwt);
		return new HttpEntity<T>(body, headers);
	}

	@SuppressWarnings("rawtypes")
	public ResponseEntity<Map> getFormio(String url){
		log.debug("proxying formio GET {}", url);
		return this.formioClient.getForEntity(url, Map.class);
	}

	@SuppressWarnings("rawtypes")
	public ResponseEntity<Map> getFormio(String url, String token){
		log.debug("proxying formio GET {}", url);
		return this.formioClient.getForEntity(url, Map.class);
	}

	@SuppressWarnings("rawtypes")
	public ResponseEntity<Map> postFormio(String url, HttpEntity request, String token){
		log.debug("proxying formio POST {}", url);
		return this.formioClient.exchange(url, HttpMethod.POST, request, Map.class);
	}

	@SuppressWarnings("rawtypes")
	private String authenticate(String email, String password) {
		Map<String, Object> payload = new HashMap<>();
		FormioLogin login = new FormioLogin()
			.setEmail(email)
			.setPassword(password);
		payload.put("data", login);
		try {
			ResponseEntity<Map> response = this.formioClient.postForEntity(USER_LOGIN, payload, Map.class);
			List<String> jwtHeaderValue = response.getHeaders().get("x-jwt-token");
			if(jwtHeaderValue.isEmpty()) {
				throw new RuntimeException("unauthorized by formio");
			} else {
				return jwtHeaderValue.get(0);
			}
		} catch(Exception ex) {
			log.debug("", ex);
			throw new RuntimeException("failed communicating to formio");
		}
	}
}
