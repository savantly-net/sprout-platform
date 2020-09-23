package net.savantly.sprout.core.tenancy;

import java.util.HashSet;
import java.util.Set;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import net.savantly.sprout.core.DataIntegrationTest;
import net.savantly.sprout.core.domain.menu.Menu;
import net.savantly.sprout.core.domain.menu.MenuRepository;

@DataIntegrationTest
public class TenantedRepositoryAspectTest {

	@Autowired
	MenuRepository repository;
	
	
	@Test
	public void test() {
		Set<String> roles = new HashSet<>();
		roles.add("user");
		
		String defaultTenant = "sprout";
		
		Menu menu = new Menu();
		menu.set_public(true);
		menu.setDisplayText("a test");
		menu.setRoles(roles);
		
		Menu saved = repository.save(menu);
		Assertions.assertEquals(defaultTenant, saved.getTenantId());

		Assertions.assertEquals(1, repository.findAll().size(), "There should be one item using " + defaultTenant);
		
		// CHANGE TENANTS
		String tenantX = "tenant-x";
		TenantContext.setCurrentTenant(tenantX);
		Assertions.assertEquals(0, repository.findAll().size(), "There should be no results since we are using a different tenant");
		
		Menu tenantXMenu = repository.save(new Menu());
		Assertions.assertEquals(tenantX, tenantXMenu.getTenantId());

		Assertions.assertEquals(1, repository.findAll().size(), "There should be one item using " + tenantX);
		
	}
}
