package net.savantly.sprout.domain.files;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

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
import org.springframework.http.MediaType;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.util.StreamUtils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import net.savantly.sprout.domain.file.FileDataDto;
import net.savantly.sprout.domain.file.FileDataRequest;
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

	@Autowired
	ObjectMapper mapper;

	@Test
	public void createFolder() throws URISyntaxException, JsonProcessingException {

		FileDataRequest folderRequest = new FileDataRequest().setColor("blue").setDir(true).setIcon("folder")
				.setName("test-folder");
		createFile(folderRequest);
	}

	@Test
	public void createFileData() throws Exception {
		String url = "/api/files";

		MockMultipartFile filePart1 = new MockMultipartFile("file", "test.js", "text/plain",
				StreamUtils.copyToByteArray(testFile.getInputStream()));

		MockMultipartFile metaData1 = new MockMultipartFile("metaData", "", "application/json",
				mapper.writeValueAsBytes(new FileDataRequest().setColor("red").setDir(false).setIcon("calendar-alt")
						.setName("test.js")));

		FileDataRequest folderRequest = new FileDataRequest().setColor("blue").setDir(true).setIcon("folder")
				.setName("test-folder");

		// upload a test file
		this.mvc.perform(multipart(url + "/upload").file(metaData1).file(filePart1)
				.with(SecurityMockMvcRequestPostProcessors.httpBasic("test", "test")))
				.andExpect(status().is2xxSuccessful());

		// assert the file was uploaded
		this.mvc.perform(get(url + "/list/")).andExpect(status().is2xxSuccessful())
				.andExpect(MockMvcResultMatchers.jsonPath("$.children[0].name", Matchers.containsString("test.js")));

		// create a subfolder
		FileDataDto folderResponse = createFile(folderRequest);

		// assert both file and folder exists in the root
		this.mvc.perform(get(url + "/list")).andExpect(status().is2xxSuccessful())
				.andExpect(MockMvcResultMatchers.jsonPath("$.children", Matchers.hasSize(2)));

		// create a second file in the subfolder
		MockMultipartFile metaData2 = new MockMultipartFile("metaData", "", "application/json",
				mapper.writeValueAsBytes(new FileDataRequest().setColor("red").setDir(false).setName("another.js")
						.setParent(folderResponse.getId())));
		this.mvc.perform(multipart(url + "/upload").file(metaData2).file(filePart1)
				.with(SecurityMockMvcRequestPostProcessors.httpBasic("test", "test")))
				.andExpect(status().is2xxSuccessful());

		this.mvc.perform(get(url + "/list/" + folderResponse.getId())).andExpect(status().is2xxSuccessful())
				.andExpect(MockMvcResultMatchers.jsonPath("$.children[0].name", Matchers.containsString("another.js")));

		// create a subfolder
		FileDataRequest subFolderRequest = new FileDataRequest().setColor("green").setDir(true).setIcon("folder")
				.setName("sub-folder").setParent(folderResponse.getId());
		FileDataDto subFolderResponse = createFile(subFolderRequest);

		// create a file in the subfolder
		MockMultipartFile metaData3 = new MockMultipartFile("metaData", "", "application/json",
				mapper.writeValueAsBytes(new FileDataRequest().setColor("red").setDir(false).setName("third.js")
						.setParent(subFolderResponse.getId())));
		MvcResult thirdFileResponse = this.mvc
				.perform(multipart(url + "/upload").file(metaData3).file(filePart1)
						.with(SecurityMockMvcRequestPostProcessors.httpBasic("test", "test")))
				.andExpect(status().is2xxSuccessful()).andReturn();

		this.mvc.perform(get(url + "/list/" + subFolderResponse.getId())).andExpect(status().is2xxSuccessful())
				.andExpect(MockMvcResultMatchers.jsonPath("$.children[0].name", Matchers.containsString("third.js")));

		byte[] thirdFileBytes = thirdFileResponse.getResponse().getContentAsByteArray();

		FileDataDto thirdFile = mapper.readValue(thirdFileBytes, FileDataDto.class);
		
		// download using metadata url
		this.mvc.perform(get(thirdFile.getDownloadUrl())).andExpect(status().is2xxSuccessful());
		
		// delete the file
		this.mvc.perform(delete(url + "/list/" + thirdFile.getId())).andExpect(status().is2xxSuccessful());

	}

	private FileDataDto createFile(FileDataRequest requestData)
			throws URISyntaxException, JsonProcessingException {
		String url = "/api/files/create";

		RequestEntity request = RequestEntity.post(new URI(url)).contentType(MediaType.APPLICATION_JSON)
				.body(mapper.writeValueAsBytes(requestData));
		ResponseEntity<FileDataDto> response = rest.withBasicAuth("test", "test").exchange(request,
				FileDataDto.class);
		Assertions.assertEquals(HttpStatus.OK, response.getStatusCode(), "Should create a folder");
		return response.getBody();
	}

	@Configuration
	@EnableAutoConfiguration
	static class TestContext {

	}
}
