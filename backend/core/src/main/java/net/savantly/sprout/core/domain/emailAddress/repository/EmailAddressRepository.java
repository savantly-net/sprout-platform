package net.savantly.sprout.core.domain.emailAddress.repository;

import java.util.List;

import net.savantly.sprout.core.domain.emailAddress.EmailAddress;
import net.savantly.sprout.core.tenancy.TenantedJpaRepository;
import net.savantly.sprout.core.tenancy.TenantedPrimaryKey;

public interface EmailAddressRepository extends TenantedJpaRepository<EmailAddress, TenantedPrimaryKey> {

	List<EmailAddress> findByEmailAddress(String emailAddress);

}
