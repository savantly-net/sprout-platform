package net.savantly.sprout.starter.jwt;

import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.net.URISyntaxException;

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
import org.springframework.web.context.WebApplicationContext;

import com.fasterxml.jackson.databind.ObjectMapper;

import io.jsonwebtoken.security.InvalidKeyException;
import net.savantly.sprout.test.IntegrationTest;

@SpringBootTest(webEnvironment=WebEnvironment.RANDOM_PORT,
		properties = {"spring.security.oauth2.resourceserver.jwt.jwk-set-uri=https://savantly.mocklab.io/.well-known/jwks.json"})
@IntegrationTest
public class JWTAutoConfigurationTest {

	private static final Logger log = LoggerFactory.getLogger(JWTAutoConfigurationTest.class);

	@Autowired
	WebApplicationContext ctx;
	@Autowired
	ObjectMapper mapper;

	@Autowired
	TestRestTemplate rest;

	private static String secret = "jhghfhddhgjkhfrsdzsxhfgfkjhlgyjdgsedxdszesgfdfjkyh";

	
	@BeforeAll
	public static void beforeClass() {
		//System.setProperty("spring.freemarker.template-loader-path", "classpath:/templates/");
	}

	// mocklab is being flakey
	//@Test
	public void useBearer() throws Exception {
		String url = "/admin/";
		
		RequestEntity request = RequestEntity.get(new URI(url))
				.header("Authorization", "Bearer " + this.getBearerToken())
				.accept(MediaType.TEXT_HTML).build();
		ResponseEntity<String> response = rest.exchange(request, String.class);
		
		Assertions.assertEquals(HttpStatus.OK, response.getStatusCode(),"Should find the admin view");
		Assertions.assertTrue("The Admin Page".contentEquals(response.getBody()));
	}
	
	private String getBearerToken() throws InvalidKeyException, UnsupportedEncodingException, URISyntaxException {
		return "eyJraWQiOiJOa05nNkljRHI0bGc1cDUyS2pyZGlzZVJEQjFPYnoiL"
				+ "CJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJudWx"
				+ "sIiwic3ViIjoiYm5Wc2JBPT0iLCJpc3MiOiJodHRwOi8vcW0xM2"
				+ "cubW9ja2xhYi5pbzo4ODg4IiwiZXhwIjo0NzUzMzE0ODMwLCJpYX"
				+ "QiOjE1OTk3MTQ4MzAsImFsZyI6IlJTMjU2Iiwibm9uY2UiOiJudWx"
				+ "sIiwiZW1haWwiOiJudWxsIn0.iOzPFO0jaCMnCMmUd-ig_xNyMV1K"
				+ "rYud0JvKI4lDHzxqiW1VlbS0-k466VTWaInA1ny4-sA4lANKaVfI2"
				+ "XwXHk9oche_axW7JvysDK_bKd69leV9giJfaRwUbiVxZKNTYj4hQV"
				+ "ufQlY46t9w9qY2EH8TS-Yel-cmyBM_6FaAu5PwP95ify-iizvtAP4"
				+ "umkOMep2U-tDSBdPLPo01O5sOpqILmonGXAQsGVmP0T9mFwJvRdFD"
				+ "beyx7d68ZmxYuJUm2VcYbiPmQcBRjurc3e1o6LFnR8ktx-wICquke"
				+ "pZSfI5OfNGbOxfOUYxgEP2623XPUYYWHcwaFkYEIUuESPtNfg";
	}

	@Configuration
	@EnableAutoConfiguration
	static class TestContext {
	}
}
