package net.savantly.sprout.core.tenancy.examples;

import net.savantly.sprout.core.domain.tenant.TenantSupport;

public interface Example extends TenantSupport {
	String getString();
	void SetString(String string);
}