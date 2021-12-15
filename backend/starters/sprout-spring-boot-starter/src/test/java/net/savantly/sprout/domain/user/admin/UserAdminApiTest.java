package net.savantly.sprout.domain.user.admin;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Random;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;

import net.savantly.sprout.core.domain.user.SproutUserDto;
import net.savantly.sprout.test.AbstractContainerBaseTest;
import net.savantly.sprout.test.IntegrationTest;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
@IntegrationTest
@ActiveProfiles({"secure"})
public class UserAdminApiTest extends AbstractContainerBaseTest {
    
    static final Logger log = LoggerFactory.getLogger(UserAdminApiTest.class);
    final String basicUser = "admin";
    final String basicPassword = "admin";
	final ObjectMapper mapper = new ObjectMapper();

    String emailAddress = "someone@savantly.net";
    String firstName = "first name";
    String lastName = "last name";
    String testUsername = "testuser";
    List<String> roles = Arrays.asList("ADMIN");

	@Autowired
	TestRestTemplate rest;

    private TestRestTemplate authenticatedRest() {
        return rest.withBasicAuth(basicUser, basicPassword);
    }
	
	@Test
	public void testGetAllUsers() throws JsonProcessingException {
		ResponseEntity<UserList> response = authenticatedRest().getForEntity("/api/admin/users", UserList.class);
		Assertions.assertEquals(200, response.getStatusCodeValue());
        Assertions.assertTrue(response.getBody().size() > 0);
		log.debug(mapper.writeValueAsString(response.getBody()));
	}

    @Test
	public SproutUserDto testCreateUser() throws JsonProcessingException {
        UserCreateDto body = getTestUser();
		ResponseEntity<SproutUserDto> response = authenticatedRest().postForEntity("/api/admin/users", body, SproutUserDto.class);
		Assertions.assertEquals(201, response.getStatusCodeValue());
        //Assertions.assertTrue(response.getBody().getEmailAddresses().stream().anyMatch(a -> a.getEmailAddress().contains(body.getEmailAddress())));
        Assertions.assertEquals(body.getFirstName(), response.getBody().getFirstName());
        Assertions.assertEquals(body.getLastName(), response.getBody().getLastName());
        Assertions.assertEquals(body.getUsername(), response.getBody().getUsername());
        return response.getBody();
	}

    @Test
    public void testGetSingleUser() throws JsonProcessingException {
        SproutUserDto user = testCreateUser();
		ResponseEntity<SproutUserDto> response = authenticatedRest().getForEntity("/api/admin/users/" + user.getUuid(), SproutUserDto.class);
        Assertions.assertEquals(200, response.getStatusCodeValue());
        Assertions.assertEquals(user.getDisplayName(), response.getBody().getDisplayName());
        Assertions.assertEquals(user.getFirstName(), response.getBody().getFirstName());
        Assertions.assertEquals(user.getLastName(), response.getBody().getLastName());
        Assertions.assertEquals(user.getUsername(), response.getBody().getUsername());
    }
    
    @Test
    public void testResetUserPassword() throws JsonProcessingException {
        SproutUserDto user = testCreateUser();
        HttpHeaders headers = new HttpHeaders();
        headers.set("content-type", "application/json");
        UserPasswordUpdateDto dto = new UserPasswordUpdateDto();
        dto.setPassword("new password");
        HttpEntity<UserPasswordUpdateDto> requestEntity = new HttpEntity<UserPasswordUpdateDto>(dto, headers);

		ResponseEntity<SproutUserDto> response = authenticatedRest()
            .exchange("/api/admin/users/" + user.getUuid() + "/password", HttpMethod.PUT, requestEntity, SproutUserDto.class);
        Assertions.assertEquals(200, response.getStatusCodeValue());
        Assertions.assertEquals(user.getDisplayName(), response.getBody().getDisplayName());
        Assertions.assertEquals(user.getFirstName(), response.getBody().getFirstName());
        Assertions.assertEquals(user.getLastName(), response.getBody().getLastName());
        Assertions.assertEquals(user.getUsername(), response.getBody().getUsername());
    }

    private UserCreateDto getTestUser() {
        Random rand = new Random();
        return new UserCreateDto()
        .setEmailAddress(emailAddress + rand.nextDouble())
        .setFirstName(firstName)
        .setLastName(lastName)
        .setPassword(password)
        .setRoles(roles)
        .setUsername(testUsername + rand.nextDouble());
    }


    static class UserList extends ArrayList<SproutUserDto> {}
    
    @Configuration
	@EnableAutoConfiguration
	static class TestContext {

	}
}
