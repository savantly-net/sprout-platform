package net.savantly.sprout.starter;

import org.junit.Assert;
import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.test.context.support.WithAnonymousUser;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.web.context.WebApplicationContext;

import com.fasterxml.jackson.databind.ObjectMapper;

@SpringBootTest(webEnvironment=WebEnvironment.RANDOM_PORT)
@TestPropertySource(locations="classpath:test.properties")
@RunWith(SpringRunner.class)
public class SproutWebSecurityConfigurationTest {

	private static final Logger log = LoggerFactory.getLogger(SproutWebSecurityConfigurationTest.class);

	@Autowired
	WebApplicationContext ctx;
	@Autowired
	ObjectMapper mapper;

	@Autowired
	TestRestTemplate rest;
	
	@BeforeClass
	public static void beforeClass() {
		//System.setProperty("spring.freemarker.template-loader-path", "classpath:/templates/");
	}
	
	@Test
	@WithAnonymousUser
	public void loadRootPage() throws Exception {
		String url = "/";
		
		ResponseEntity<String> result = rest.getForEntity(url, String.class);
		
		log.info("{}", result.getBody());
		Assert.assertTrue("Should find the root view", result.getStatusCode() == HttpStatus.OK);
	}
	

	@Test
	@WithAnonymousUser
	public void loadLoginPage() throws Exception {
		String url = "/login";
		
		ResponseEntity<String> result = rest.getForEntity(url, String.class);
		
		log.info("{}", result.getBody());
		Assert.assertTrue("Should find the login view", result.getStatusCode() == HttpStatus.OK);
	}
	
	@Test
	@WithAnonymousUser
	public void loadAdminPage() throws Exception {
		String url = "/admin/asdasdasd";
		
		ResponseEntity<String> result = rest.getForEntity(url, String.class);
		
		log.info("{}", result.getBody());
		Assert.assertTrue("Should be redirected for authentication", result.getStatusCode() == HttpStatus.OK);
	}
	
	@Configuration
	@EnableAutoConfiguration
	static class TestContext {}
}