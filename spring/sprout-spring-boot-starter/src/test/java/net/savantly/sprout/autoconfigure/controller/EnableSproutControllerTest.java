package net.savantly.sprout.autoconfigure.controller;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.context.annotation.Configuration;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import net.savantly.sprout.core.configuration.SproutControllerConfiguration;
import net.savantly.sprout.starter.SproutBaseController;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT, properties = { "debug=false",
		"savantly.sprout.controller.jsLibs[0]=" + EnableSproutControllerTest.testJsUrl,
		"savantly.sprout.controller.jsLibs[1]=" + EnableSproutControllerTest.internalJsUrl })
@TestPropertySource(locations = "classpath:test.properties")
@WithMockUser
public class EnableSproutControllerTest {

	Logger log = LoggerFactory.getLogger(EnableSproutControllerTest.class);

	@Autowired
	WebApplicationContext ctx;
	private MockMvc mvc;

	protected static final String testJsUrl = "http://example.com/test.js";

	protected static final String internalJsPath = "test.js";
	protected static final String internalJsUrl = "classpath:/static/" + internalJsPath;
	protected static final String jsResources = "jsResources";

	@Before
	public void setup() {
		mvc = MockMvcBuilders.webAppContextSetup(ctx).build();
	}

	@Test
	public void contextLoads() {
		try {
			ctx.getBean(SproutControllerConfiguration.class);
			ctx.getBean(SproutBaseController.class);
		} catch (Exception ex) {
			Assert.fail("Missing required beans.");
		}
	}

	@Test
	public void loadIndexPage() throws Exception {
		mvc.perform(get("/")).andExpect(status().isOk());
	}

	@Test
	public void indexPageModelContainsExternalJsResource() throws Exception {

		mvc.perform(get("/")).andExpect(MockMvcResultMatchers.model().attribute(jsResources, hasItem(testJsUrl)));
	}

	@Test
	public void indexPageModelContainsClasspathJsResource() throws Exception {
		mvc.perform(get("/"))
				.andExpect(MockMvcResultMatchers.model().attribute(jsResources, hasItem(internalJsPath + "?v=0")));
	}

	@Test
	public void indexPageMarkupContainsExternalJsResource() throws Exception {
		MvcResult result = mvc.perform(get("/")).andExpect(status().isOk()).andReturn();
		MockHttpServletResponse response = result.getResponse();
		log.debug(response.getContentAsString());
		Assert.assertTrue(response.getContentAsString().contains(testJsUrl));
	}

	@Configuration
	@EnableAutoConfiguration
	static class TestContext {

	}

}
