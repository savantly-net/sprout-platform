package net.savantly.sprout.starter.jwt;

import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

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
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.web.context.WebApplicationContext;

import com.fasterxml.jackson.databind.ObjectMapper;

import io.jsonwebtoken.security.InvalidKeyException;
import net.savantly.sprout.starter.security.jwt.TokenProvider;
import net.savantly.sprout.test.AbstractContainerBaseTest;
import net.savantly.sprout.test.IntegrationTest;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
@IntegrationTest
public class InternalJwtTest extends AbstractContainerBaseTest {

	private static final Logger log = LoggerFactory.getLogger(JWTAutoConfigurationTest.class);

	@Autowired
	WebApplicationContext ctx;
	@Autowired
	ObjectMapper mapper;
	@Autowired
	TokenProvider tokenProvider;

	@Autowired
	TestRestTemplate rest;

	private static String secret = "jhghfhddhgjkhfrsdzsxhfgfkjhlgyjdgsedxdszesgfdfjkyh";

	@BeforeAll
	public static void beforeClass() {
		// System.setProperty("spring.freemarker.template-loader-path",
		// "classpath:/templates/");
	}

	// disable if mocklab is being flakey
	@Test
	public void useBearer() throws Exception {
		String url = "/api/account";

		RequestEntity request = RequestEntity.get(new URI(url))
				.header("Authorization", "Bearer " + this.getBearerToken()).accept(MediaType.APPLICATION_JSON).build();
		ResponseEntity<Map> response = rest.exchange(request, Map.class);

		Assertions.assertEquals(HttpStatus.OK, response.getStatusCode(), "Should get account details");
		Assertions.assertFalse(response.getBody().get("name").equals("anonymousUser"), "Should not be anonymous");
	}

	private String getBearerToken() throws InvalidKeyException, UnsupportedEncodingException, URISyntaxException {
		List<GrantedAuthority> authorities = new ArrayList<>();
		authorities.add(new SimpleGrantedAuthority("ADMIN"));

		return tokenProvider.createToken(new UsernamePasswordAuthenticationToken("test@savantly.net", "", authorities),
				true);
	}

	@Configuration
	@EnableAutoConfiguration
	static class TestContext {
	}
}
