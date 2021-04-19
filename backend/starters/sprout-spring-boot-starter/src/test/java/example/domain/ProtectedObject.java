package example.domain;

import javax.persistence.Entity;

import net.savantly.sprout.core.tenancy.TenantKeyedEntity;

@Entity
public class ProtectedObject extends TenantKeyedEntity {
	String name = "test";
}