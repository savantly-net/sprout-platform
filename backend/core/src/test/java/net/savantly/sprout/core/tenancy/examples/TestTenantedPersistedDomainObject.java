package net.savantly.sprout.core.tenancy.examples;

import javax.persistence.Entity;

import net.savantly.sprout.core.tenancy.TenantedPersistedDomainObject;

@Entity
public class TestTenantedPersistedDomainObject extends TenantedPersistedDomainObject implements Example {
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