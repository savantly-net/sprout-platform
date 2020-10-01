package net.savantly.sprout.domain.dashboard;

import java.io.IOException;
import java.nio.file.Files;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;

import com.fasterxml.jackson.databind.ObjectMapper;

import net.savantly.sprout.autoconfigure.properties.SproutConfigurationProperties;
import net.savantly.sprout.test.IntegrationTest;


@SpringBootTest(webEnvironment=WebEnvironment.RANDOM_PORT)
@IntegrationTest
public class DashboardServiceTest {

	@Autowired
	ObjectMapper mapper;
	
	@Autowired
	DashboardService service;
	
	@Autowired
	SproutConfigurationProperties props;
	
	@Value("classpath:/dashboards/dashboardSave.json")
	Resource homeDashboardResource;
	
	@Test
	public void testGamut() throws IOException {
		byte[] bytes = Files.readAllBytes(homeDashboardResource.getFile().toPath());
		DashboardSaveRequest dto = mapper.readValue(bytes, DashboardSaveRequest.class);
		DashboardDtoWrapper savedDto = this.service.saveDashboard(dto);
		
		DashboardDtoWrapper dtoByUuid = this.service.getByUuid(savedDto.getDashboard().getUid());
		
		DashboardDtoWrapper latestById = this.service.getLatestById(savedDto.getDashboard().getId());
		
		Assertions.assertEquals(savedDto, dtoByUuid, "should be the same when finding by uuid");
		Assertions.assertEquals(savedDto, latestById, "should be the same when searching by id");
		
	}

	@Configuration
	@EnableAutoConfiguration
	static class TestContext {}
}
