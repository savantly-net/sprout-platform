package net.savantly.sprout.starter;

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
import org.springframework.http.ResponseEntity;
import org.springframework.security.test.context.support.WithAnonymousUser;
import org.springframework.test.context.TestPropertySource;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.context.WebApplicationContext;

import com.fasterxml.jackson.databind.ObjectMapper;

@SpringBootTest(webEnvironment=WebEnvironment.RANDOM_PORT)
@TestPropertySource(locations="classpath:test.properties")
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
		
		ResponseEntity<String> result = rest.getForEntity(url, String.class);
		
		log.info("{}", result.getBody());
		Assertions.assertTrue(result.getStatusCode() == HttpStatus.OK, "Should find the root view");
	}
	

	@Test
	@WithAnonymousUser
	public void loadLoginPage() throws Exception {
		String url = "/login";
		
		ResponseEntity<String> result = rest.getForEntity(url, String.class);
		
		log.info("{}", result.getBody());
		Assertions.assertTrue(result.getStatusCode() == HttpStatus.OK, "Should find the login view");
	}
	
	@Test
	@WithAnonymousUser
	public void doLogin() throws Exception {
		String url = "/login";
		
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

		MultiValueMap<String, String> map= new LinkedMultiValueMap<String, String>();
		map.add("username", "admin");
		map.add("password", "password");

		HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<MultiValueMap<String, String>>(map, headers);

		ResponseEntity<String> result = rest.postForEntity(url, request, String.class);
		
		Assertions.assertTrue(result.getStatusCode() == HttpStatus.FOUND, "Should login successfully and be redirected");
	}
	
	@Test
	@WithAnonymousUser
	public void loadAdminPage() throws Exception {
		String url = "/admin/asdasdasd";
		
		ResponseEntity<String> result = rest.getForEntity(url, String.class);
		
		log.info("{}", result.getBody());
		Assertions.assertTrue(result.getStatusCode() == HttpStatus.OK, "Should be redirected for authentication");
	}
	
	@Configuration
	@EnableAutoConfiguration
	static class TestContext {}
}