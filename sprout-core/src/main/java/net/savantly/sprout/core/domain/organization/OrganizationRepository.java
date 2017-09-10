package net.savantly.sprout.core.domain.organization;

import org.springframework.data.repository.PagingAndSortingRepository;

public interface OrganizationRepository extends PagingAndSortingRepository<Organization, String>{

	Organization findOneByName(String string);

}
