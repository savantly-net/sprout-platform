package net.savantly.sprout.autoconfigure;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import net.savantly.sprout.core.domain.menu.Menu;
import net.savantly.sprout.core.domain.menu.MenuRepository;

@SpringBootTest
@WebAppConfiguration
@ActiveProfiles("test")
public class SproutWebMvcAutoConfigurationTest {
	
	private static final Logger log = LoggerFactory.getLogger(SproutWebMvcAutoConfigurationTest.class);

	@Autowired
	WebApplicationContext ctx;	
	@Autowired
	MenuRepository repository;
	
	private MockMvc mvc;

	@BeforeEach
	public void setup() {
		mvc = MockMvcBuilders
				.webAppContextSetup(ctx)
				.build();
	}
	
	@Test
	@WithMockUser(authorities = {"ADMIN"})
	public void testMenuApi() throws Exception {
		Set<String> roles = new HashSet<>();
		roles.add("user");
		
		Menu menu = new Menu();
		menu.set_public(true);
		menu.setDisplayText("a test");
		menu.setAuthorities(roles);
		menu.setName("menu1");
		
		Menu menu2 = new Menu();
		menu2.set_public(true);
		menu2.setDisplayText("a test");
		menu.setAuthorities(roles);
		menu2.setParentName("menu1");
		menu2.setName("menu2");
		
		repository.saveAll(Arrays.asList(menu, menu2));
		
		MvcResult result = mvc.perform(get("/api/menu")).andExpect(status().isOk()).andReturn();
		
		log.info(result.getResponse().getContentAsString());
		
		mvc.perform(delete("/api/menu/" + menu2.getId()));
		
		result = mvc.perform(get("/api/menu")).andExpect(status().isOk()).andReturn();
		
		log.info(result.getResponse().getContentAsString());
	}
	
	
	@Configuration
	@EnableAutoConfiguration
	static class TestContext{
		
	}
	
}
