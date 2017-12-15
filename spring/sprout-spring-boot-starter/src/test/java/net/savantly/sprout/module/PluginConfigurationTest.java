package net.savantly.sprout.module;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.WebApplicationContext;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import net.savantly.sprout.controllers.PluginsController;
import net.savantly.sprout.core.module.SimpleSproutModuleExecutionResponse;
import net.savantly.sprout.core.module.SproutModule;
import net.savantly.sprout.core.module.SproutModuleAdapter;
import net.savantly.sprout.core.module.SproutModuleConfiguration;
import net.savantly.sprout.core.module.SproutModuleExecutionResponse;
import net.savantly.sprout.module.PluginConfigurationTest.TestContext.ExampleController;

@SpringBootTest
@WebAppConfiguration
@RunWith(SpringRunner.class)
public class PluginConfigurationTest {

	private static final Logger log = LoggerFactory.getLogger(PluginConfigurationTest.class);
	private static final String EXAMPLE_MODULE_KEY = "myExampleModule";

	@Autowired
	WebApplicationContext ctx;
	@Autowired
	ObjectMapper mapper;
	
	private MockMvc mvc;

	@Before
	public void setup() {
		mvc = MockMvcBuilders
				.webAppContextSetup(ctx)
				.build();
	}
	
	@Test
	public void confirmControllerBeanExists() {
		ExampleController bean = ctx.getBean(ExampleController.class);
		Assert.assertNotNull(bean);
	}
	
	@Test
	public void confirmPluginControllerBeanExists() {
		PluginsController bean = ctx.getBean(PluginsController.class);
		Assert.assertNotNull(bean);
	}
	
	@Test
	public void confirmSproutModuleBeanExists() {
		SproutModule bean = ctx.getBean(SproutModule.class);
		Assert.assertNotNull(bean);
	}
	
	@Test
	public void testPluginController() throws Exception {
		MvcResult result = mvc.perform(get("/rest/plugins")).andExpect(status().isOk()).andReturn();
		String content = result.getResponse().getContentAsString();
		log.info(content);
		JsonNode jsonNode = mapper.readTree(content);
		Assert.assertTrue("the example module should be in the payload: " + content, jsonNode.has(EXAMPLE_MODULE_KEY));
	}
	
	@Test
	public void testExampleModule() throws Exception {
		MvcResult result = mvc.perform(get("/rest/modules/example/")).andExpect(status().isOk()).andReturn();
		String content = result.getResponse().getContentAsString();
		Assert.assertEquals("The response should be the same", "example-response", content);
	}

	@Test
	public void testPluginControllerForExampleModuleUserConfig() throws Exception {
		MvcResult result = mvc.perform(get("/rest/plugins/"+EXAMPLE_MODULE_KEY+"/user-config")).andExpect(status().isOk()).andReturn();
		String content = result.getResponse().getContentAsString();
		Assert.assertEquals("The response should be the same", "{}", content);
	}
	
	
	@Configuration
	@EnableAutoConfiguration
	static class TestContext{
		
		@Bean(EXAMPLE_MODULE_KEY)
		public SproutModule exampleSproutModule() {
			return new ExampleModule();
		}
		
		@Bean PluginsController pluginsController(ApplicationContext context) {
			return new PluginsController(context);
		}
		
		@RestController
		@RequestMapping("/rest/modules/example")
		class ExampleController {
			@RequestMapping("/")
			public String index() {
				return "example-response";
			}
		}
		
		@SproutModuleConfiguration("example-module")
		class ExampleModule extends SproutModuleAdapter {
			
			@Override
			public String getName() {
				return "example";
			}

			@Override
			public String getWelcomeUrl() {
				return "rest/modules/example/";
			}

			@Override
			public String getVersion() {
				return "0.0.0";
			}

			@Override
			public SproutModuleExecutionResponse install() {
				return new SimpleSproutModuleExecutionResponse(true, 0, "Install completed");
			}

			@Override
			public SproutModuleExecutionResponse uninstall() {
				return new SimpleSproutModuleExecutionResponse(true, 0, "Uninstall completed");
			}

			@Override
			public String getDescription() {
				// TODO Auto-generated method stub
				return null;
			}
			
		};
	}
}
