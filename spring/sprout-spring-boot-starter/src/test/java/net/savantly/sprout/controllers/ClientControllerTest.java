package net.savantly.sprout.controllers;

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
import org.springframework.context.annotation.Configuration;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import net.savantly.sprout.core.content.fieldType.FieldType;
import net.savantly.sprout.core.domain.menu.MenuRepository;

@SpringBootTest
@WebAppConfiguration
@RunWith(SpringRunner.class)
public class ClientControllerTest {
	private static final Logger log = LoggerFactory.getLogger(ClientControllerTest.class);

	@Autowired
	WebApplicationContext ctx;	
	@Autowired
	MenuRepository repository;
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
	public void testFieldTypes() throws Exception {
		MvcResult result = mvc.perform(get("/rest/client/fieldTypes")).andExpect(status().isOk()).andReturn();
		String contentString = result.getResponse().getContentAsString();
		log.info(contentString);
		
		JsonNode json = mapper.readTree(contentString);
		String formattedAssertion = "response should contain an object with the name: %s";
		for (FieldType ft : FieldType.values()) {
			boolean found = false;
			for (JsonNode jsonNode : json) {
				found = jsonNode.get("name") != null;
				if(found) continue;
			}
			Assert.assertTrue(String.format(formattedAssertion, ft), found);
		}
		
	}
	
	@Configuration
	@EnableAutoConfiguration
	static class TestContext{
		
	}
}
