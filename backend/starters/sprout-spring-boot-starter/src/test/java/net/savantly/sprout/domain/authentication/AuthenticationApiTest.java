package net.savantly.sprout.domain.authentication;

import java.net.URI;
import java.util.List;
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
import org.springframework.security.test.context.support.WithAnonymousUser;
import org.springframework.test.context.ActiveProfiles;

import com.fasterxml.jackson.databind.ObjectMapper;

import net.savantly.sprout.domain.authentication.oauth.ImplicitFlowDto;
import net.savantly.sprout.test.AbstractContainerBaseTest;
import net.savantly.sprout.test.IntegrationTest;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT, properties = {
		"spring.security.oauth2.resourceserver.jwt.jwk-set-uri=https://savantly.mocklab.io/.well-known/jwks.json" })
@IntegrationTest
@ActiveProfiles("oauth")
public class AuthenticationApiTest extends AbstractContainerBaseTest {

	@Autowired
	ObjectMapper mapper;
	@Autowired
	TestRestTemplate rest;

	@Test
	@WithAnonymousUser
	public void getClientOAuthConfig() throws Exception {
		String url = "/api/authentication/oauth";
		RequestEntity request = RequestEntity.get(new URI(url)).accept(MediaType.APPLICATION_JSON).build();
		ResponseEntity<Map> response = rest.exchange(request, Map.class);

		Assertions.assertEquals(HttpStatus.OK, response.getStatusCode(), "Should get a list of implicit flow clients");

		List flows = (List) response.getBody().get("clients");
		ImplicitFlowDto flow = mapper.convertValue(flows.get(0), ImplicitFlowDto.class);
		Assertions.assertTrue(flow.getClientId().contains("mocklab"));
	}

	@Configuration
	@EnableAutoConfiguration
	static class TestContext {

	}
}
