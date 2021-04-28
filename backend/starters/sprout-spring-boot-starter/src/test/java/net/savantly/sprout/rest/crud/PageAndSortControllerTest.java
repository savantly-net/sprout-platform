package net.savantly.sprout.rest.crud;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
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
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.context.WebApplicationContext;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import net.savantly.sprout.core.domain.organization.Organization;
import net.savantly.sprout.core.domain.organization.OrganizationRepository;
import net.savantly.sprout.test.AbstractContainerBaseTest;
import net.savantly.sprout.test.IntegrationTest;

@SpringBootTest(webEnvironment=WebEnvironment.RANDOM_PORT)
@IntegrationTest
public class PageAndSortControllerTest extends AbstractContainerBaseTest {

	private static final Logger log = LoggerFactory.getLogger(PageAndSortControllerTest.class);
	
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
	public void testGetAll() throws Exception {
		MvcResult result = mvc.perform(get("/api/example")).andExpect(status().isOk()).andReturn();
		String content = result.getResponse().getContentAsString();
		log.info(content);
		JsonNode jsonNode = mapper.readTree(content);
		Assertions.assertTrue(jsonNode.has("content"));
	}
	
	@Test
	public void testCreate() throws Exception {
		String body = "{\"name\": \"test\"}";
		MvcResult result = mvc.perform(
				post("/api/example")
				.content(body)
				.contentType(MediaType.APPLICATION_JSON))
			.andExpect(status().isCreated()).andReturn();
		String content = result.getResponse().getContentAsString();
		log.info(content);
		JsonNode jsonNode = mapper.readTree(content);
		Assertions.assertTrue(jsonNode.has("name"));
		
		testGetAll();
	}

	@Configuration
	@EnableAutoConfiguration
	static class TestContext {
		
		@Bean
		public ExampleCrudController exampleCrudController(OrganizationRepository repo) {
			return new ExampleCrudController(repo);
		}
		
		@RequestMapping("/api/example")
		static class ExampleCrudController extends PageAndSortProjectionController<Organization, CompanyName, String, OrganizationRepository> {

			public ExampleCrudController(OrganizationRepository repository) {
				super(repository, CompanyName.class);
			}
			
		}
	}
	
	interface CompanyName {
		public String getName();
	}
}
