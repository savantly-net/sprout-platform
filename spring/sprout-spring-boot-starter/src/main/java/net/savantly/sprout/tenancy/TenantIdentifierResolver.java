package net.savantly.sprout.tenancy;

import org.hibernate.context.spi.CurrentTenantIdentifierResolver;

public class TenantIdentifierResolver implements CurrentTenantIdentifierResolver {
    @Override
    public String resolveCurrentTenantIdentifier() {
        return TenantContext.getCurrentTenant();
    }
    @Override
    public boolean validateExistingCurrentSessions() {
        return true;
    }
}