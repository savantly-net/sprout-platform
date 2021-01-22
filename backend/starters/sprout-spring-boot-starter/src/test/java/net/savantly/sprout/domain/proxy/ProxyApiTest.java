package net.savantly.sprout.domain.proxy;

import java.io.UnsupportedEncodingException;

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
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.web.client.RestClientException;

import com.fasterxml.jackson.databind.ObjectMapper;

import net.savantly.sprout.test.IntegrationTest;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT, properties = {"sprout.proxy.allowedUris[0]=.*savantly.net.*"})
@IntegrationTest
@ActiveProfiles("secure")
public class ProxyApiTest {

	static final Logger log = LoggerFactory.getLogger(ProxyApiTest.class);
	@Autowired
	TestRestTemplate rest;
	ObjectMapper mapper = new ObjectMapper();
	
	@Test
	public void testOk() {
		ResponseEntity<String> response = rest.withBasicAuth("admin", "admin").getForEntity("/api/proxy", String.class);
		Assertions.assertEquals(200, response.getStatusCodeValue());
		log.debug(response.getBody());
	}
	
	@Test
	public void testDisallowed() throws RestClientException, UnsupportedEncodingException {
		ProxyRequestDto body = new ProxyRequestDto().setMethod(HttpMethod.GET).setUrl("http://google.com");
		ResponseEntity<String> response = getResponse(body);
		Assertions.assertEquals(400, response.getStatusCodeValue());
		log.debug(response.getBody());
	}
	
	@Test
	public void testAllowed() throws RestClientException, UnsupportedEncodingException {
		ProxyRequestDto body = new ProxyRequestDto().setMethod(HttpMethod.GET).setUrl("http://savantly.net");
		ResponseEntity<String> response = getResponse(body);
		Assertions.assertTrue(400 > response.getStatusCodeValue());
		log.debug(response.getBody());
	}

	@Test
	public void testNestedPath() throws RestClientException, UnsupportedEncodingException {
		ProxyRequestDto body = new ProxyRequestDto().setMethod(HttpMethod.GET).setUrl("http://savantly.net/favicon.png");
		ResponseEntity<String> response = getResponse(body);
		Assertions.assertTrue(400 > response.getStatusCodeValue());
		log.debug(response.getBody());
	}
	
	private ResponseEntity<String> getResponse(ProxyRequestDto body) {
		return rest.withBasicAuth("admin", "admin").postForEntity("/api/proxy", body, String.class);
	}

	@Configuration
	@EnableAutoConfiguration
	static class TestContext {

	}

}
