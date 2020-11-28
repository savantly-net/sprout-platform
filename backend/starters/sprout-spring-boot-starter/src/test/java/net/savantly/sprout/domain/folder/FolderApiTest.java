package net.savantly.sprout.domain.folder;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import net.savantly.sprout.test.IntegrationTest;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
@IntegrationTest
@ActiveProfiles({ "basicauth" })
public class FolderApiTest {

	@Autowired
	ObjectMapper mapper;
	@Autowired
	TestRestTemplate rest;
	
	@Test
	public void withAnonymousUser() throws Exception {
		String url = "/api/folders";

		FolderDto root = new FolderDto().setIcon("cube").setName("root");

		RequestEntity request = RequestEntity.post(new URI(url)).body(mapper.writeValueAsString(root));
		ResponseEntity<FolderDto> response = rest.exchange(request, FolderDto.class);

		Assertions.assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode(), "Should fail to create folder");
	}

	@Test
	public void withTestUser() throws Exception {

		FolderDto root1 = createOne(new FolderDto().setIcon("cube").setName("root1"));

		FolderDto root2 = createOne(new FolderDto().setIcon("cube").setName("root2"));

		FolderDto child1 = createOne(new FolderDto().setIcon("cube").setName("child1").setParent(root1.getId()));

		FolderDto grandChild1 = createOne(new FolderDto().setIcon("cube").setName("grandChild1").setParent(child1.getId()));

		String url = "/api/folders";

		RequestEntity request = RequestEntity.get(new URI(url)).accept(MediaType.APPLICATION_JSON).build();
		ResponseEntity<FolderList> response = rest.withBasicAuth("test", "test").exchange(request, FolderList.class);

		Assertions.assertEquals(HttpStatus.OK, response.getStatusCode(), "Should get all folders");
		Assertions.assertEquals(2,  response.getBody().size());
		Assertions.assertTrue(response.getBody().stream().anyMatch(f -> f.getChildren().size() > 0));
		

		
		RequestEntity deleteRequest = RequestEntity.delete(new URI(url + "/" + root1.getId())).build();
		ResponseEntity<Void> deleteResponse = rest.withBasicAuth("test", "test").exchange(deleteRequest, Void.class);
		Assertions.assertEquals(HttpStatus.OK, deleteResponse.getStatusCode(), "Should delete");
	}
	
	static class FolderList extends ArrayList<FolderDto> {
		
	}

	private FolderDto createOne(FolderDto dto) throws JsonProcessingException, URISyntaxException {
		String url = "/api/folders";

		RequestEntity request = RequestEntity.post(new URI(url)).contentType(MediaType.APPLICATION_JSON)
				.body(mapper.writeValueAsString(dto));
		ResponseEntity<FolderDto> response = rest.withBasicAuth("test", "test").exchange(request, FolderDto.class);

		Assertions.assertEquals(HttpStatus.OK, response.getStatusCode(), "Should get account information");
		Assertions.assertTrue(dto.getIcon().contentEquals(response.getBody().getIcon()));
		Assertions.assertEquals(dto.getName(), response.getBody().getName());
		return response.getBody();
	}

	@Configuration
	@EnableAutoConfiguration
	static class TestContext {

	}
}
