package net.savantly.sprout.module.forms;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Configuration;
import org.springframework.test.context.ActiveProfiles;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import net.savantly.sprout.module.forms.domain.definition.FormDefinition;
import net.savantly.sprout.module.forms.domain.definition.FormDefinitionDto;

@ActiveProfiles("test")
@SpringBootTest
public class FormServiceTest extends AbstractContainerBaseTest {
	
	@Autowired
	FormService service;
	@Autowired
	ObjectMapper mapper;
	
	@Autowired
	FormsModule module;
	
	@BeforeEach
	public void beforeEach() {
		module.install();
	}
	

	@Test
	public void shouldSerializeAndDeserialize() throws JsonMappingException, JsonProcessingException {
		FormDefinitionDto fDefinition = mapper.readValue(exampleForm, FormDefinitionDto.class);
		
		FormDefinition entity = service.fromDto(fDefinition);
		
		FormDefinitionDto backAgain = service.fromEntity(entity);
		Assertions.assertEquals(fDefinition.getComponents().size(), backAgain.getComponents().size());
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
