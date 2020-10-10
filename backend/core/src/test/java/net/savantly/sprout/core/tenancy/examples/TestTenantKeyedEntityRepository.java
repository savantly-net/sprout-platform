package net.savantly.sprout.core.tenancy.examples;

import net.savantly.sprout.core.tenancy.TenantedJpaRepository;
import net.savantly.sprout.core.tenancy.TenantedPrimaryKey;

public interface TestTenantKeyedEntityRepository extends TenantedJpaRepository<TestTenantKeyedEntity, TenantedPrimaryKey> {}