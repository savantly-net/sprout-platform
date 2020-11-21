package net.savantly.sprout.starter.security;

import java.net.URI;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.test.context.support.WithAnonymousUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.web.context.WebApplicationContext;

import com.fasterxml.jackson.databind.ObjectMapper;

import net.savantly.sprout.test.IntegrationTest;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
@IntegrationTest
@ActiveProfiles({ "basicauth", "oauth" })
public class SecurityConfigurationComboTest {

	private static final Logger log = LoggerFactory.getLogger(SproutWebSecurityConfigurationTest.class);

	@Autowired
	WebApplicationContext ctx;
	@Autowired
	ObjectMapper mapper;

	@Autowired
	TestRestTemplate rest;

	@Test
	@WithAnonymousUser
	public void loadRootPage() throws Exception {
		String url = "/";

		RequestEntity request = RequestEntity.get(new URI(url)).accept(MediaType.TEXT_HTML).build();
		ResponseEntity<String> response = rest.exchange(request, String.class);

		Assertions.assertEquals(HttpStatus.OK, response.getStatusCode(), "Should find the root view");
		Assertions.assertTrue("The Root Index Page".contentEquals(response.getBody()));
	}
	@Test
	@WithAnonymousUser
	public void doLogin() throws Exception {
		String url = "/api/login";
		
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);

		String body = "{\"username\": \"test\", \"password\":\"test\"}";

		HttpEntity<String> request = new HttpEntity<String>(body, headers);

		ResponseEntity<String> response = rest.postForEntity(url, request, String.class);
		
		Assertions.assertEquals(HttpStatus.OK, response.getStatusCode(),"Should login successfully");
	}
	
	@Test
	@WithAnonymousUser
	public void loadAdminPageUnauthorized() throws Exception {
		String url = "/admin/";
		
		ResponseEntity<String> response = rest.getForEntity(url, String.class);
		
		log.info("{}", response.getBody());
		Assertions.assertEquals(HttpStatus.FOUND, response.getStatusCode(), "Should fail to access");
	}
	
	@Test
	@WithAnonymousUser
	public void loadAdminPage() throws Exception {
		String url = "/admin/";
		// username / password comes from basicauth test profile config
		ResponseEntity<String> response = rest.withBasicAuth("test", "test").getForEntity(url, String.class);
		
		log.info("{}", response.getBody());
		Assertions.assertEquals(HttpStatus.OK, response.getStatusCode(), "Should succeed with basic auth");
	}
	
	@Test
	public void redirectToLogin() throws Exception {
		String url = "/admin/";
		
		RequestEntity request = RequestEntity.get(new URI(url))
				.accept(MediaType.TEXT_HTML).build();
		ResponseEntity<String> response = rest.exchange(request, String.class);
		
		Assertions.assertEquals(HttpStatus.FOUND, response.getStatusCode(),"Should be redirected for login");
	}
	
	@Test
	public void shouldNotRedirectToLogin() throws Exception {
		String url = "/admin/";
		
		RequestEntity request = RequestEntity.get(new URI(url))
				.header("X-Requested-With", "XMLHttpRequest")
				.accept(MediaType.TEXT_HTML).build();
		ResponseEntity<String> response = rest.exchange(request, String.class);
		
		Assertions.assertEquals(HttpStatus.FORBIDDEN, response.getStatusCode(),"XHR should NOT be redirected for login");
	}

	@Configuration
	@EnableAutoConfiguration
	static class TestContext {
	}
}
