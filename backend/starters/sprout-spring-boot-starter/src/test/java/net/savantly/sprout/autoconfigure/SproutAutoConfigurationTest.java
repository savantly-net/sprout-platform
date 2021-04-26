package net.savantly.sprout.autoconfigure;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import javax.transaction.Transactional;

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
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

@SpringBootTest
@WebAppConfiguration
@Transactional
@ActiveProfiles("test")
public class SproutAutoConfigurationTest {
	{
		System.setProperty("spring.freemarker.template-loader-path", "classpath:/templates/");
	}
	
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
	public void testInitialization(){
		ctx.getBean(SproutAutoConfiguration.class);
	}

	
	@Configuration
	@EnableAutoConfiguration
	@Import(SproutAutoConfiguration.class)
	static class TestContext{
		
	}
}
