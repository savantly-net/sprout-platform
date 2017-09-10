package net.savantly.sprout.core.domain.emailAddress;

import org.springframework.data.repository.PagingAndSortingRepository;

public interface EmailAddressRepository extends PagingAndSortingRepository<EmailAddress, String>, EmailAddressRepositoryCustom {


}
