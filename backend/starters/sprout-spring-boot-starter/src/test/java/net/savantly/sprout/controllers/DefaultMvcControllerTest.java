package net.savantly.sprout.controllers;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import net.savantly.sprout.autoconfigure.SproutAutoConfiguration;

@SpringBootTest
@WebAppConfiguration
public class DefaultMvcControllerTest {

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
		mvc.perform(get("/")).andExpect(status().isOk());
	}
	
	@Test
	public void loadAdminIndexPage() throws Exception {
		mvc.perform(get("/admin/")).andExpect(status().isOk());
	}
	
	/**
	 * It should redirect all non-static file requests back to the admin template
	 * @throws Exception
	 */
	@Test
	public void loadAdminSubPage() throws Exception {
		mvc.perform(get("/admin/foo")).andExpect(status().isOk()).andExpect(content().string("The Admin Page"));
	}
	
	@Test
	public void loadAdminSubSubPage() throws Exception {
		mvc.perform(get("/admin/foo/bar")).andExpect(status().isOk()).andExpect(content().string("The Admin Page"));
	}
	
	@Test
	public void loadAdminStaticFile() throws Exception {
		mvc.perform(get("/admin/test.js")).andExpect(status().isOk()).andExpect(content().contentTypeCompatibleWith("application/javascript"));
	}
	
	@Test
	public void loadAdminSubFolderStaticFile() throws Exception {
		mvc.perform(get("/admin/baz/test.js")).andExpect(status().isOk()).andExpect(content().contentTypeCompatibleWith("application/javascript"));
	}
	
	@Test
	public void failOnNonExistentAdminStaticFile() throws Exception {
		mvc.perform(get("/admin/i-dont-exist.js")).andExpect(status().isNotFound());
	}
	
	@Configuration
	@EnableAutoConfiguration
	@Import(SproutAutoConfiguration.class)
	static class TestContext{
		
	}
}
