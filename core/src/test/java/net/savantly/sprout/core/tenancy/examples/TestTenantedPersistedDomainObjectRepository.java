package net.savantly.sprout.core.tenancy.examples;

import net.savantly.sprout.core.tenancy.TenantedJpaRepository;

public interface TestTenantedPersistedDomainObjectRepository extends TenantedJpaRepository<TestTenantedPersistedDomainObject, String> {}