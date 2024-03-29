package net.savantly.sprout.module;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.WebApplicationContext;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import net.savantly.sprout.autoconfigure.SproutAutoConfiguration;
import net.savantly.sprout.controllers.PluginsApi;
import net.savantly.sprout.core.module.SproutModule;
import net.savantly.sprout.core.module.SproutModuleConfiguration;
import net.savantly.sprout.core.module.SproutWebModule;
import net.savantly.sprout.module.PluginConfigurationTest.TestContext.ExampleController;
import net.savantly.sprout.test.AbstractContainerBaseTest;

@SpringBootTest(webEnvironment=WebEnvironment.RANDOM_PORT)
public class PluginConfigurationTest extends AbstractContainerBaseTest {

	private static final Logger log = LoggerFactory.getLogger(PluginConfigurationTest.class);
	private static final String EXAMPLE_MODULE_KEY = "example-module";

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
	public void confirmControllerBeanExists() {
		ExampleController bean = ctx.getBean(ExampleController.class);
		Assertions.assertNotNull(bean);
	}
	
	@Test
	public void confirmPluginControllerBeanExists() {
		PluginsApi bean = ctx.getBean(PluginsApi.class);
		Assertions.assertNotNull(bean);
	}
	
	@Test
	public void confirmSproutModuleBeanExists() {
		SproutModule bean = ctx.getBean(SproutModule.class);
		Assertions.assertNotNull(bean);
	}
	
	@Test
	public void testPluginController() throws Exception {
		MvcResult result = mvc.perform(get("/api/plugins/panel")).andExpect(status().isOk()).andReturn();
		String content = result.getResponse().getContentAsString();
		log.info(content);
		JsonNode jsonNode = mapper.readTree(content);
		Assertions.assertTrue(jsonNode.at("/0").has("id"), "the example module should be in the payload: " + content);
	}
	
	@Test
	public void testExampleModuleCustomController() throws Exception {
		MvcResult result = mvc.perform(get("/api/example/")).andExpect(status().isOk()).andReturn();
		String content = result.getResponse().getContentAsString();
		Assertions.assertEquals("example-response", content);
	}

	@Test
	public void testPluginControllerForSettings() throws Exception {
		mvc.perform(post("/api/plugins/"+EXAMPLE_MODULE_KEY+"/settings").content("{\"jsonData\":{\"test\":\"value\"}}")
				.contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk());
		MvcResult result = mvc.perform(get("/api/plugins/"+EXAMPLE_MODULE_KEY+"/settings")).andExpect(status().isOk()).andReturn();
		String content = result.getResponse().getContentAsString();
		JsonNode jsonNode = mapper.readTree(content);
		Assertions.assertTrue(jsonNode.at("/jsonData").has("test"), "the test property should be in the jsonData payload: " + content);
	}
	
	
	@Configuration
	@Import(SproutAutoConfiguration.class)
	@EnableAutoConfiguration
	static class TestContext{
		
		@Bean
		public SproutModule exampleSproutModule() {
			return new ExampleModule();
		}
		
		@RestController
		@RequestMapping("/api/example")
		class ExampleController {
			@RequestMapping("/")
			public String index() {
				return "example-response";
			}
		}
		
		@SproutModuleConfiguration
		class ExampleModule implements SproutWebModule {
			
			@Override
			public String getName() {
				return "example";
			}

			@Override
			public String getVersion() {
				return "0.0.0";
			}

			@Override
			public String getDescription() {
				return "example module";
			}

			@Override
			public String getId() {
				return EXAMPLE_MODULE_KEY;
			}

			@Override
			public String getPluginInformationContent() {
				return "test";
			}

		};
	}
}
