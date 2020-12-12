package net.savantly.sprout.domain.files;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.io.File;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;

import org.hamcrest.Matchers;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.mock.web.MockPart;
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.util.StreamUtils;

import net.savantly.sprout.domain.file.jpa.JpaFile;
import net.savantly.sprout.test.IntegrationTest;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
@IntegrationTest
@ActiveProfiles("basicauth")
@AutoConfigureMockMvc
public class FileProviderApiTest {

	@Autowired
	TestRestTemplate rest;

	@Autowired
	private MockMvc mvc;

	@Value("classpath:/static/test.js")
	Resource testFile;

	@Test
	void createFolder() throws URISyntaxException {
		String url = "/api/files/test";

		RequestEntity request = RequestEntity.post(new URI(url)).build();
		ResponseEntity<JpaFile> response = rest.withBasicAuth("test", "test").exchange(request, JpaFile.class);
		Assertions.assertEquals(HttpStatus.OK, response.getStatusCode(), "Should create a folder");
	}

	@Test
	public void createFileData() throws Exception {
		String url = "/api/files/";

		
		this.mvc.perform(multipart(url)
				.part(new MockPart("file", "test.js", StreamUtils.copyToByteArray(testFile.getInputStream())))
				.with(SecurityMockMvcRequestPostProcessors.httpBasic("test", "test")))
				.andExpect(status().is2xxSuccessful());

		this.mvc.perform(get(url)).andExpect(status().is2xxSuccessful())
				.andExpect(MockMvcResultMatchers.jsonPath("$[0].name", Matchers.containsString("test.js")));
		

		this.mvc.perform(post(url + "/testFolder")).andExpect(status().is2xxSuccessful());
		

		this.mvc.perform(get(url)).andExpect(status().is2xxSuccessful())
				.andExpect(MockMvcResultMatchers.jsonPath("$", Matchers.hasSize(2)));

		this.mvc.perform(multipart(url + "/testFolder")
				.part(new MockPart("file", "another.js", StreamUtils.copyToByteArray(testFile.getInputStream())))
				.with(SecurityMockMvcRequestPostProcessors.httpBasic("test", "test")))
				.andExpect(status().is2xxSuccessful());

		this.mvc.perform(get(url + "/testFolder")).andExpect(status().is2xxSuccessful())
		.andExpect(MockMvcResultMatchers.jsonPath("$[0].name", Matchers.containsString("another.js")));

	}

	private File getTestFile() throws IOException {
		return this.testFile.getFile();
	}

	@Configuration
	@EnableAutoConfiguration
	static class TestContext {

	}
}
