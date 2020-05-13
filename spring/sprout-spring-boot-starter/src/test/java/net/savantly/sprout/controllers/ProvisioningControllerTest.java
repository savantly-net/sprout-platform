package net.savantly.sprout.controllers;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Optional;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Configuration;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.util.NestedServletException;

import com.fasterxml.jackson.databind.ObjectMapper;

import net.savantly.sprout.core.domain.tenant.TenantEntity;
import net.savantly.sprout.core.domain.tenant.TenantRepository;

@SpringBootTest
@WebAppConfiguration
public class ProvisioningControllerTest {
	private static final Logger log = LoggerFactory.getLogger(ProvisioningControllerTest.class);

	private static final String TENANT_ID = "TENANT_X";

	@Autowired
	WebApplicationContext ctx;	
	@Autowired
	TenantRepository repository;
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
	public void testSuccessfulProvisioning() throws Exception {
		
		Optional<TenantEntity> tenantOpt = repository.findById(TENANT_ID);
		if (!tenantOpt.isPresent()) {
			TenantEntity tenant = new TenantEntity();
			tenant.setId(TENANT_ID);
			repository.save(tenant);
		}
		
		MvcResult result = mvc.perform(post("/rest/provisioning/tenant/" + TENANT_ID)).andExpect(status().isOk()).andReturn();
		String contentString = result.getResponse().getContentAsString();
		log.debug(contentString);
		
	}
	
	@Test
	public void testMissingTenant() throws Exception {
		Assertions.assertThrows(NestedServletException.class, ()->{
			mvc.perform(post("/rest/provisioning/tenant/I_DONT_EXIST"));
		});
	}
	
	@Configuration
	@EnableAutoConfiguration
	static class TestContext{
		
	}
}