package net.savantly.sprout.controllers;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import net.savantly.sprout.core.domain.tenant.Tenant;
import net.savantly.sprout.core.domain.tenant.TenantEntity;
import net.savantly.sprout.starter.SchemaConfiguration;

@RestController
@RequestMapping("/rest/provisioning")
@Secured({"ROLE_ADMIN"})
public class ProvisioningController {
	private static final Logger log = LoggerFactory.getLogger(ProvisioningController.class);
	
	@Autowired
	SchemaConfiguration schema;

	@PostMapping("/tenant/{tenantId}")
	public Map<String, Object> provisionNewTenant(@PathVariable("tenantId") TenantEntity tenant) throws Exception{
		Assert.notNull(tenant, "tenant not found");
		Map<String, Object> response = new HashMap<>();
		schema.ensureSchemaExists(tenant.getId());
		schema.ensureTablesExist(tenant.getId());
		response.put("message", "successfully provisioned new tenant");
		return response;
	}
}
