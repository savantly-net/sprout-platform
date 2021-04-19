package example.domain;

import net.savantly.sprout.core.tenancy.TenantKeyedRepository;

public interface ProtectedObjectRepo extends TenantKeyedRepository<ProtectedObject> {
}