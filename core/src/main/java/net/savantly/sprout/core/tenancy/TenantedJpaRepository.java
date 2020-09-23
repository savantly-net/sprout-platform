package net.savantly.sprout.core.tenancy;

import java.io.Serializable;

import org.springframework.data.jpa.repository.JpaRepository;

import net.savantly.sprout.core.domain.tenant.TenantSupport;

public interface TenantedJpaRepository<T extends TenantSupport, ID extends Serializable> extends JpaRepository<T, ID> {

}
