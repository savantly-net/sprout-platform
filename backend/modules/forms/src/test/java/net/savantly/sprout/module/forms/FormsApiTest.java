package net.savantly.sprout.module.forms;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import com.fasterxml.jackson.databind.ObjectMapper;

import net.savantly.sprout.module.forms.domain.definition.FormDefinitionDto;

@ActiveProfiles("test")
@SpringBootTest(webEnvironment = WebEnvironment.MOCK)
public class FormsApiTest {
	
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
	public void findFormDefinitions() throws Exception {
		mvc.perform(get("/api/savantly-forms/form")).andExpect(status().isOk());
	}
	
	@Test
	public void shouldCreateForm() throws Exception {
		Map<String, Object> component = new HashMap<>();
		component.put("test", new HashMap<String, Object>());
		
		List<Map<String, Object>> components = new ArrayList<>();
		components.add(component);
		
		FormDefinitionDto request = new FormDefinitionDto()
				.setTitle("test-title")
				.setComponents(components);
		
		String requestString = mapper.writeValueAsString(request);
		
		mvc.perform(post("/api/savantly-forms/form")
				.contentType(MediaType.APPLICATION_JSON)
				.content(exampleForm)).andExpect(status().isOk());
		
		MvcResult result = mvc.perform(get("/api/savantly-forms/form")).andExpect(status().isOk()).andReturn();
		System.out.println(result.getResponse().getContentAsString());
	}

	@Test
	public void findFormData() throws Exception {
		mvc.perform(get("/api/savantly-forms/data")).andExpect(status().isOk());
	}
	
	
	private String exampleForm = "{\n" + 
			"   \"components\": [\n" + 
			"      {\n" + 
			"         \"type\": \"textfield\",\n" + 
			"         \"label\": \"FirstName\",\n" + 
			"         \"key\": \"firstName\",\n" + 
			"         \"input\": true\n" + 
			"      },\n" + 
			"      {\n" + 
			"         \"type\": \"textfield\",\n" + 
			"         \"label\": \"LastName\",\n" + 
			"         \"key\": \"lastName\",\n" + 
			"         \"input\": true\n" + 
			"      },\n" + 
			"      {\n" + 
			"         \"type\": \"email\",\n" + 
			"         \"label\": \"Email\",\n" + 
			"         \"key\": \"email\",\n" + 
			"         \"input\": true\n" + 
			"      },\n" + 
			"      {\n" + 
			"         \"type\": \"button\",\n" + 
			"         \"action\": \"submit\",\n" + 
			"         \"label\": \"Submit\",\n" + 
			"         \"theme\": \"primary\"\n" + 
			"      }\n" + 
			"   ]\n" + 
			"}";
	


	@Configuration
	@EnableAutoConfiguration
	static class TestContext{
		
	}
}
