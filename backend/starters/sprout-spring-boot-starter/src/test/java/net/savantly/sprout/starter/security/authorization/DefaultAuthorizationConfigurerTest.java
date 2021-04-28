package net.savantly.sprout.starter.security.authorization;

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

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
@IntegrationTest
@ActiveProfiles({"secure", "oauth"})
public class DefaultAuthorizationConfigurerTest extends AbstractContainerBaseTest {
	
	@Autowired
	ObjectMapper mapper;
	@Autowired
	TestRestTemplate rest;

	// ANONYMOUS TESTS
	@Test
	public void apiRepoAnon() throws Exception {
		String url = "/api/repo";
		RequestEntity request = RequestEntity.get(new URI(url)).accept(MediaType.APPLICATION_JSON).build();
		ResponseEntity<Map> response = rest.exchange(request, Map.class);
		Assertions.assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
	}
	
	@Test
	public void defaultPageAnon() throws Exception {
		String url = "/";
		ResponseEntity response = rest.getForEntity(new URI(url), String.class);
		Assertions.assertEquals(HttpStatus.OK, response.getStatusCode());
	}

	@Test
	public void loginPageAnon() throws Exception {
		String url = "/login";
		ResponseEntity response = rest.getForEntity(new URI(url), String.class);
		Assertions.assertEquals(HttpStatus.OK, response.getStatusCode());
	}

	@Test
	public void adminPageAnon() throws Exception {
		String url = "/admin/";
		RequestEntity request = RequestEntity.get(new URI(url)).build();
		ResponseEntity<String> response = rest.exchange(request, String.class);
		Assertions.assertEquals(HttpStatus.FOUND, response.getStatusCode());
	}
	
	@Test
	public void swaggerDocsAnon() throws Exception {
		String url = "/v3/api-docs";
		RequestEntity request = RequestEntity.get(new URI(url)).accept(MediaType.APPLICATION_JSON).build();
		ResponseEntity<Map> response = rest.exchange(request, Map.class);
		Assertions.assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
	}
	
	@Test
	public void swaggerConfigAnon() throws Exception {
		String url = "/v3/api-docs/swagger-config";
		RequestEntity request = RequestEntity.get(new URI(url)).accept(MediaType.APPLICATION_JSON).build();
		ResponseEntity<Map> response = rest.exchange(request, Map.class);
		Assertions.assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
	}
	
	// Admin User Tests
	@Test
	public void apiRepoAmin() throws Exception {
		String url = "/api/repo";
		RequestEntity request = RequestEntity.get(new URI(url)).accept(MediaType.APPLICATION_JSON).build();
		ResponseEntity<Map> response = rest.withBasicAuth("admin", "admin").exchange(request, Map.class);
		Assertions.assertEquals(HttpStatus.FORBIDDEN, response.getStatusCode());
	}
	
	@Test
	public void defaultPageAdmin() throws Exception {
		String url = "/";
		ResponseEntity response = rest.withBasicAuth("admin", "admin").getForEntity(new URI(url), String.class);
		Assertions.assertEquals(HttpStatus.OK, response.getStatusCode());
	}

	@Test
	public void adminPageAdmin() throws Exception {
		String url = "/admin/";
		RequestEntity request = RequestEntity.get(new URI(url)).build();
		ResponseEntity<String> response = rest.withBasicAuth("admin", "admin").exchange(request, String.class);
		Assertions.assertEquals(HttpStatus.OK, response.getStatusCode());
	}
	
	@Test
	public void swaggerDocsAdmin() throws Exception {
		String url = "/v3/api-docs";
		RequestEntity request = RequestEntity.get(new URI(url)).accept(MediaType.APPLICATION_JSON).build();
		ResponseEntity<Map> response = rest.withBasicAuth("admin", "admin").exchange(request, Map.class);
		Assertions.assertEquals(HttpStatus.OK, response.getStatusCode());
	}
	
	@Test
	public void swaggerConfigAdmin() throws Exception {
		String url = "/v3/api-docs/swagger-config";
		RequestEntity request = RequestEntity.get(new URI(url)).accept(MediaType.APPLICATION_JSON).build();
		ResponseEntity<Map> response = rest.withBasicAuth("admin", "admin").exchange(request, Map.class);
		Assertions.assertEquals(HttpStatus.OK, response.getStatusCode());
	}
	
	// Test user
	@Test
	public void adminPageTest() throws Exception {
		String url = "/admin/";
		RequestEntity request = RequestEntity.get(new URI(url)).build();
		ResponseEntity<String> response = rest.withBasicAuth("test", "test").exchange(request, String.class);
		Assertions.assertEquals(HttpStatus.FORBIDDEN, response.getStatusCode());
	}
	
	@Test
	public void swaggerDocsTest() throws Exception {
		String url = "/v3/api-docs";
		RequestEntity request = RequestEntity.get(new URI(url)).accept(MediaType.APPLICATION_JSON).build();
		ResponseEntity<Map> response = rest.withBasicAuth("test", "test").exchange(request, Map.class);
		Assertions.assertEquals(HttpStatus.FORBIDDEN, response.getStatusCode());
	}
	
	@Test
	public void swaggerConfigTest() throws Exception {
		String url = "/v3/api-docs/swagger-config";
		RequestEntity request = RequestEntity.get(new URI(url)).accept(MediaType.APPLICATION_JSON).build();
		ResponseEntity<Map> response = rest.withBasicAuth("test", "test").exchange(request, Map.class);
		System.out.println(mapper.writeValueAsString(response.getBody()));
		Assertions.assertEquals(HttpStatus.FORBIDDEN, response.getStatusCode());
	}
	

	@Configuration
	@EnableAutoConfiguration
	static class TestContext {

	}
}
