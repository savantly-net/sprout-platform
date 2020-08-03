package net.savantly.sprout.wiki.repository;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.Before;
import org.junit.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import net.savantly.sprout.modules.test.SproutModuleTest;
import net.savantly.sprout.wiki.WikiModule;

@TestPropertySource(locations="classpath:test.properties")
@ComponentScan(basePackageClasses=WikiModule.class)
public class WikiItemRepositoryTest extends SproutModuleTest {
	
	Logger log = LoggerFactory.getLogger(WikiItemRepositoryTest.class);
	
	@Autowired
	WebApplicationContext ctx;
	private MockMvc mvc;

	@Before
	public void setup() {
		mvc = MockMvcBuilders
				.webAppContextSetup(ctx)
				.build();
	}
	
	@Test
	@WithMockUser
	public void testClientResourcesExist() throws Exception {
		String clientJsPath = "modules/sprout-wiki/module.js?v=0";
		mvc.perform(get("/")).andExpect(status().isOk());
	}
	
	@Test
	@WithMockUser
	public void testApiGet() throws Exception {
		String requestPath = "/api/";
		MvcResult result = mvc.perform(get(requestPath)).andReturn();
		MockHttpServletResponse response = result.getResponse();
		String string = response.getContentAsString();
		log.info(string);
	}

}
