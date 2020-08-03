package net.savantly.sprout.core.domain.tenant;

import java.util.Set;

public interface Tenant {
	
	String getId();
	String getDescription();
	Set<String> getAliases();

}