package net.savantly.sprout.core.domain.emailAddress.repository;

import org.springframework.data.repository.PagingAndSortingRepository;

import net.savantly.sprout.core.domain.emailAddress.EmailAddress;

public interface EmailAddressRepository extends PagingAndSortingRepository<EmailAddress, String>, EmailAddressRepositoryCustom {


}
