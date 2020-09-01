package net.savantly.sprout.autoconfigure;


import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.HashMap;
import java.util.Map;

import javax.transaction.Transactional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import com.fasterxml.jackson.databind.ObjectMapper;


@SpringBootTest
@WebAppConfiguration
@Transactional
public class SproutSecurityConfigurationTest {
	
	@Autowired
	WebApplicationContext ctx;
	@Autowired
	ObjectMapper mapper;
	
	private MockMvc mvc;

	@BeforeEach
	public void setup() {
		mvc = MockMvcBuilders
				.webAppContextSetup(ctx)
				.build();
	}
	
	@Test
	public void testInitialization() throws Exception{
		Map<String, String> userMap = new HashMap<String, String>();
		userMap.put("username", "demo");
		userMap.put("clearTextPassword", "demo");
		
		String body = mapper.writeValueAsString(userMap);
		
		this.mvc.perform(post("/api/repo/users").content(body).contentType(MediaType.APPLICATION_JSON))
		.andExpect(status().is2xxSuccessful());
	}

	
	@Configuration
	@EnableAutoConfiguration
	@Import({SproutAutoConfiguration.class, SproutSecurityAutoConfiguration.class})
	static class TestContext{
		
	}
}
