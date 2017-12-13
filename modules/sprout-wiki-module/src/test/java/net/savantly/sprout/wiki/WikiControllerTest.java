package net.savantly.sprout.wiki;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.Before;
import org.junit.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import net.savantly.sprout.modules.test.SproutModuleTest;

@TestPropertySource(locations="classpath:test.properties")
@ComponentScan(basePackageClasses=WikiModule.class)
public class WikiControllerTest extends SproutModuleTest {
	
	Logger log = LoggerFactory.getLogger(WikiControllerTest.class);
	
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
	public void testDefaultWikiPage() throws Exception {
		mvc.perform(get("/rest/modules/sprout-wiki/")).andExpect(status().isOk());
	}
	
	@Test
	@WithMockUser
	public void testPluginsPage() throws Exception {
		mvc.perform(get("/rest/plugins")).andExpect(status().isOk());
	}

}
