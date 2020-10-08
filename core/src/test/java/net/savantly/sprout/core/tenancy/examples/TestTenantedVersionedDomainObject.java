package net.savantly.sprout.core.tenancy.examples;

import javax.persistence.Entity;

import net.savantly.sprout.core.tenancy.TenantedVersionedDomainObject;

@Entity
public class TestTenantedVersionedDomainObject extends TenantedVersionedDomainObject implements Example {
	private String string;

	@Override
	public String getString() {
		return this.string;
	}

	@Override
	public void SetString(String string) {
		this.string = string;
	}
}