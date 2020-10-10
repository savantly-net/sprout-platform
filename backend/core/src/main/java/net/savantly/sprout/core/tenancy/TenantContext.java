package net.savantly.sprout.core.tenancy;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class TenantContext {
	private final static String DEFAULT_TENANT_ID = "sprout";
    private static Logger logger = LoggerFactory.getLogger(TenantContext.class);
    private static ThreadLocal<String> currentTenant = ThreadLocal.withInitial(() -> {return DEFAULT_TENANT_ID; });

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
