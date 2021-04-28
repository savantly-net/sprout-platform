package net.savantly.sprout.domain.account;

import java.net.URI;
import java.util.Map;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;

import com.fasterxml.jackson.databind.ObjectMapper;

import net.savantly.sprout.test.AbstractContainerBaseTest;
import net.savantly.sprout.test.IntegrationTest;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT, properties = {
		"spring.security.oauth2.resourceserver.jwt.jwk-set-uri=https://savantly.mocklab.io/.well-known/jwks.json" })
@IntegrationTest
@ActiveProfiles({ "oauth" })
public class AccountApiTest extends AbstractContainerBaseTest {

	@Autowired
	ObjectMapper mapper;
	@Autowired
	TestRestTemplate rest;

	@Test
	public void withAnonymousUser() throws Exception {
		String url = "/api/account";
		RequestEntity request = RequestEntity.get(new URI(url)).accept(MediaType.APPLICATION_JSON).build();
		ResponseEntity<Map> response = rest.exchange(request, Map.class);

		Assertions.assertEquals(HttpStatus.OK, response.getStatusCode(), "Should get account information");
		Assertions.assertTrue("anonymousUser".equals(response.getBody().get("name")));
	}
	
	@Test
	public void withTestUser() throws Exception {
		String url = "/api/account";
		RequestEntity request = RequestEntity.get(new URI(url)).accept(MediaType.APPLICATION_JSON).build();
		ResponseEntity<Map> response = rest.withBasicAuth("test", "test").exchange(request, Map.class);

		Assertions.assertEquals(HttpStatus.OK, response.getStatusCode(), "Should get account information");
	}

	@Configuration
	@EnableAutoConfiguration
	static class TestContext {

	}
}
