package net.savantly.sprout.core.tenancy;

import java.io.Serializable;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import net.savantly.sprout.core.DataIntegrationTest;
import net.savantly.sprout.core.tenancy.examples.Example;
import net.savantly.sprout.core.tenancy.examples.TestTenantKeyedEntity;
import net.savantly.sprout.core.tenancy.examples.TestTenantKeyedEntityRepository;
import net.savantly.sprout.core.tenancy.examples.TestTenantedPersistedDomainObject;
import net.savantly.sprout.core.tenancy.examples.TestTenantedPersistedDomainObjectRepository;
import net.savantly.sprout.core.tenancy.examples.TestTenantedVersionedDomainObject;
import net.savantly.sprout.core.tenancy.examples.TestTenantedVersionedDomainObjectRepository;

@DataIntegrationTest
@EnableJpaRepositories
public class TenantedRepositoryAspectTest {

	@Autowired
	TestTenantedVersionedDomainObjectRepository TTVDOR;
	@Autowired
	TestTenantKeyedEntityRepository TTKER;
	@Autowired
	TestTenantedPersistedDomainObjectRepository TTPDOR;
	
	
	@Test
	public void testTenantedPersistedDomainObject() {
		doAssertions(
				new TestTenantedPersistedDomainObject(),
				new TestTenantedPersistedDomainObject(), (TenantedJpaRepository)TTPDOR);
		
	}
	
	@Test
	public void testTenantedVersionedDomainObject() {
		doAssertions(
				new TestTenantedVersionedDomainObject(),
				new TestTenantedVersionedDomainObject(), (TenantedJpaRepository)TTVDOR);
		
	}
	
	@Test
	public void testTenantKeyedEntity() {
		doAssertions(
				new TestTenantKeyedEntity(),
				new TestTenantKeyedEntity(), (TenantedJpaRepository)TTKER);
		
	}
	
	private <T extends Example, R extends TenantedJpaRepository<T, Serializable>> void doAssertions(T entity1, T entity2, R repo) {

		String defaultTenant = "sprout";
		String testString1 = "test1";
		String testString2 = "test2";
		
		entity1.SetString(testString1);
		entity2.SetString(testString2);
		
		Example defaultTenantEntity = repo.save(entity1);
		Assertions.assertEquals(defaultTenant, defaultTenantEntity.getTenantId());

		Assertions.assertEquals(1, repo.findAll().size(), "There should be one item using " + defaultTenant);
		
		// CHANGE TENANTS
		String tenantX = "tenant-x";
		TenantContext.setCurrentTenant(tenantX);
		Assertions.assertEquals(0, repo.findAll().size(), "There should be no results since we are using a different tenant");
		
		Example tenantXEntity = repo.save(entity2);
		Assertions.assertEquals(tenantX, entity2.getTenantId());

		Assertions.assertEquals(1, repo.findAll().size(), "There should be one item using " + tenantX);
		
		Assertions.assertEquals(testString1, defaultTenantEntity.getString());
		Assertions.assertEquals(testString2, tenantXEntity.getString());
		
		TenantContext.clear();
		
	}
	
	
	
	
	
}
