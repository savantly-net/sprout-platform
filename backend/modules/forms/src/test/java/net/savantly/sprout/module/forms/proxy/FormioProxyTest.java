package net.savantly.sprout.module.forms.proxy;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.util.NestedServletException;

import com.fasterxml.jackson.databind.ObjectMapper;

import net.savantly.sprout.autoconfigure.SproutAutoConfiguration;
import net.savantly.sprout.module.forms.formio.ProjectCreateRequest;

@SpringBootTest
@WebAppConfiguration
public class FormioProxyTest {
	
	@Autowired
	WebApplicationContext ctx;
	ObjectMapper mapper = new ObjectMapper();
	
	private MockMvc mvc;

	@BeforeEach
	public void setup() {
		mvc = MockMvcBuilders
				.webAppContextSetup(ctx)
				.build();
	}
	
	@Test
	public void loadIndex() throws Exception {
		mvc.perform(get("/api/savantly-forms/formio")).andExpect(status().isOk());
	}
	
	@Test
	public void loadRemoteIndex() throws Exception {
		mvc.perform(get("/api/savantly-forms/formio/")).andExpect(status().isOk());
	}

	@Test
	public void shouldBeUnauthorized() throws Exception {
		Assertions.assertThatExceptionOfType(NestedServletException.class).isThrownBy(() -> {
			mvc.perform(get("/api/savantly-forms/formio/current")).andExpect(status().isUnauthorized());
		});
	}
	
	@Test
	public void shouldCreateProject() throws Exception {
		ProjectCreateRequest request = new ProjectCreateRequest()
				.setDescription("test-description")
				.setName("test_name")
				.setTitle("test-title");
		mvc.perform(post("/api/savantly-forms/project/")
				.contentType(MediaType.APPLICATION_JSON)
				.content(mapper.writeValueAsBytes(request))).andExpect(status().isOk());
	}
	
	@Configuration
	@EnableAutoConfiguration
	@Import(SproutAutoConfiguration.class)
	static class TestContext{
		
	}
}
