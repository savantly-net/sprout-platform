package net.savantly.sprout.module;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Collections;
import java.util.Map;

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
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.WebApplicationContext;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import net.savantly.sprout.autoconfigure.SproutAutoConfiguration;
import net.savantly.sprout.controllers.PluginsController;
import net.savantly.sprout.core.module.ConfigurableSproutModule;
import net.savantly.sprout.core.module.SimpleSproutModuleExecutionResponse;
import net.savantly.sprout.core.module.SproutModule;
import net.savantly.sprout.core.module.SproutModuleConfiguration;
import net.savantly.sprout.core.module.SproutModuleExecutionResponse;
import net.savantly.sprout.module.PluginConfigurationTest.TestContext.ExampleController;

@SpringBootTest(webEnvironment=WebEnvironment.RANDOM_PORT)
public class PluginConfigurationTest {

	private static final Logger log = LoggerFactory.getLogger(PluginConfigurationTest.class);
	private static final String EXAMPLE_MODULE_KEY = "myExampleModule";

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
		PluginsController bean = ctx.getBean(PluginsController.class);
		Assertions.assertNotNull(bean);
	}
	
	@Test
	public void confirmSproutModuleBeanExists() {
		SproutModule bean = ctx.getBean(SproutModule.class);
		Assertions.assertNotNull(bean);
	}
	
	@Test
	public void testPluginController() throws Exception {
		MvcResult result = mvc.perform(get("/api/plugins")).andExpect(status().isOk()).andReturn();
		String content = result.getResponse().getContentAsString();
		log.info(content);
		JsonNode jsonNode = mapper.readTree(content);
		Assertions.assertTrue(jsonNode.has(EXAMPLE_MODULE_KEY), "the example module should be in the payload: " + content);
	}
	
	@Test
	public void testExampleModule() throws Exception {
		MvcResult result = mvc.perform(get("/api/modules/example/")).andExpect(status().isOk()).andReturn();
		String content = result.getResponse().getContentAsString();
		Assertions.assertEquals("example-response", content);
	}

	@Test
	public void testPluginControllerForExampleModuleUserConfig() throws Exception {
		MvcResult result = mvc.perform(get("/api/plugins/"+EXAMPLE_MODULE_KEY+"/user-config")).andExpect(status().isOk()).andReturn();
		String content = result.getResponse().getContentAsString();
		Assertions.assertEquals("{}", content);
	}
	
	
	@Configuration
	@Import(SproutAutoConfiguration.class)
	@EnableAutoConfiguration
	static class TestContext{
		
		@Bean(EXAMPLE_MODULE_KEY)
		public SproutModule exampleSproutModule() {
			return new ExampleModule();
		}
		
		@RestController
		@RequestMapping("/api/modules/example")
		class ExampleController {
			@RequestMapping("/")
			public String index() {
				return "example-response";
			}
		}
		
		@SproutModuleConfiguration("example-module")
		class ExampleModule implements ConfigurableSproutModule {
			
			@Override
			public String getName() {
				return "example";
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
				return "example module";
			}

			@Override
			public String getKey() {
				return "example-module";
			}

			@Override
			public void setBeanName(String name) {}

			@Override
			public Map<String, Object> getUserConfiguration() {
				return Collections.EMPTY_MAP;
			}

			@Override
			public void saveUserConfiguration(Map<String, String> configuration) {}

			@Override
			public Map<String, Object> getAdminConfiguration() {
				return Collections.EMPTY_MAP;
			}

			@Override
			public void saveAdminConfiguration(Map<String, String> configuration) {}

		};
	}
}
