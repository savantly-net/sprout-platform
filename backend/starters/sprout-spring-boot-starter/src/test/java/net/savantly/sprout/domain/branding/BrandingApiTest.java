package net.savantly.sprout.domain.branding;

import java.net.URI;
import java.util.Objects;

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
import org.springframework.security.test.context.support.WithAnonymousUser;
import org.springframework.test.context.ActiveProfiles;

import net.savantly.sprout.test.IntegrationTest;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT, properties = {
"spring.security.oauth2.resourceserver.jwt.jwk-set-uri=https://savantly.mocklab.io/.well-known/jwks.json" })
@IntegrationTest
@ActiveProfiles("oauth")
public class BrandingApiTest {

	@Autowired
	TestRestTemplate rest;

	@Test
	@WithAnonymousUser
	// Testing with anonymous user to catch security blocks
	public void getFavicon() throws Exception {
		String url = "/api/public/brand/favicon";
		RequestEntity request = RequestEntity.get(new URI(url)).build();
		ResponseEntity<byte[]> response = rest.exchange(request, byte[].class);
		Assertions.assertEquals(HttpStatus.OK, response.getStatusCode(), "Should get the favicon bytes");
		Assertions.assertTrue(Objects.nonNull(response.getBody()));
	}
	
	@Test
	@WithAnonymousUser
	// Testing with anonymous user to catch security blocks
	public void getLogo() throws Exception {
		String url = "/api/public/brand/logo";
		RequestEntity request = RequestEntity.get(new URI(url)).accept(MediaType.IMAGE_PNG).build();
		ResponseEntity<byte[]> response = rest.exchange(request, byte[].class);
		Assertions.assertEquals(HttpStatus.OK, response.getStatusCode(), "Should get the logo bytes");
		Assertions.assertTrue(Objects.nonNull(response.getBody()));
	}

	@Test
	@WithAnonymousUser
	// Testing with anonymous user to catch security blocks
	public void getMiniLogo() throws Exception {
		String url = "/api/public/brand/mini-logo";
		RequestEntity request = RequestEntity.get(new URI(url)).accept(MediaType.IMAGE_PNG).build();
		ResponseEntity<byte[]> response = rest.exchange(request, byte[].class);
		Assertions.assertEquals(HttpStatus.OK, response.getStatusCode(), "Should get the mini-logo bytes");
		Assertions.assertTrue(Objects.nonNull(response.getBody()));
	}

	@Configuration
	@EnableAutoConfiguration
	static class TestContext {

	}
}
