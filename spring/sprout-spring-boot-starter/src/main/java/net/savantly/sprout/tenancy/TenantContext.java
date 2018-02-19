package net.savantly.sprout.tenancy;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import net.savantly.sprout.starter.SchemaConfiguration;

public class TenantContext {
	private static String DEFAULT_TENANT_ID = SchemaConfiguration.DEFAULT_SCHEMA;
    private static Logger logger = LoggerFactory.getLogger(TenantContext.class);
    private static ThreadLocal<String> currentTenant = ThreadLocal.withInitial(() -> {return SchemaConfiguration.DEFAULT_SCHEMA; });

    public static void setCurrentTenant(String tenant) {
    	if (tenant == null) {
    		tenant = DEFAULT_TENANT_ID;
    	}
        logger.debug("Setting tenant to " + tenant);
        currentTenant.set(tenant);
    }
    public static String getCurrentTenant() {
        if(currentTenant.get() != null) {
        	return currentTenant.get();
        } else return DEFAULT_TENANT_ID;
    }
    public static void clear() {
        currentTenant.set(null);
    }
}
