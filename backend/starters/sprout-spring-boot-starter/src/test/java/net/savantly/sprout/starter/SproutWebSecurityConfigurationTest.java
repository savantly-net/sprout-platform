package net.savantly.sprout.starter;

import java.net.URI;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
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
import org.springframework.web.context.WebApplicationContext;

import com.fasterxml.jackson.databind.ObjectMapper;

import net.savantly.sprout.test.IntegrationTest;

@SpringBootTest(webEnvironment=WebEnvironment.RANDOM_PORT)
@IntegrationTest
public class SproutWebSecurityConfigurationTest {

	private static final Logger log = LoggerFactory.getLogger(SproutWebSecurityConfigurationTest.class);

	@Autowired
	WebApplicationContext ctx;
	@Autowired
	ObjectMapper mapper;

	@Autowired
	TestRestTemplate rest;
	
	@BeforeAll
	public static void beforeClass() {
		//System.setProperty("spring.freemarker.template-loader-path", "classpath:/templates/");
	}
	
	@Test
	@WithAnonymousUser
	public void loadRootPage() throws Exception {
		String url = "/";
		
		RequestEntity request = RequestEntity.get(new URI(url)).accept(MediaType.TEXT_HTML).build();
		ResponseEntity<String> response = rest.exchange(request, String.class);
		
		Assertions.assertEquals(HttpStatus.OK, response.getStatusCode(),"Should find the root view");
		Assertions.assertTrue("The Root Index Page".contentEquals(response.getBody()));
	}
	
	@Test
	@WithAnonymousUser
	public void doLogin() throws Exception {
		String url = "/api/login";
		
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);

		String body = "{\"username\": \"admin\", \"password\":\"password\"}";

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
		Assertions.assertEquals(HttpStatus.FORBIDDEN, response.getStatusCode(), "Should fail to access");
	}
	
	// TODO: Fix security testing admin
	//@Test
	//@WithUserDetails(value = "admin")
	public void loadAdminRedirect() throws Exception {
		String url = "/admin";
		
		ResponseEntity<String> response = rest.getForEntity(url, String.class);
		Assertions.assertEquals(HttpStatus.PERMANENT_REDIRECT, response.getStatusCode(), "Should be redirected with trailing slash");
	}
	
	@Configuration
	@EnableAutoConfiguration
	static class TestContext {}
}