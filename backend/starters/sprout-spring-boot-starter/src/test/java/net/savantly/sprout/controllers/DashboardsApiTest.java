package net.savantly.sprout.controllers;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import net.savantly.sprout.autoconfigure.SproutAutoConfiguration;

@SpringBootTest
@WebAppConfiguration
@ActiveProfiles("test")
public class DashboardsApiTest {
	
	@Autowired
	WebApplicationContext ctx;
	
	private MockMvc mvc;

	@BeforeEach
	public void setup() {
		mvc = MockMvcBuilders
				.webAppContextSetup(ctx)
				.build();
	}
	
	@Test
	public void loadIndexPage() throws Exception {
		mvc.perform(get("/api/dashboards/home")).andExpect(status().isOk());
	}
	
	@Configuration
	@EnableAutoConfiguration
	@Import(SproutAutoConfiguration.class)
	static class TestContext{
		
	}

}
