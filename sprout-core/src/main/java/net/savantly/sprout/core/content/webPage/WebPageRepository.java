package net.savantly.sprout.core.content.webPage;

import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import net.savantly.sprout.core.domain.PersistedDomainObjectRepository;

@RepositoryRestResource
public interface WebPageRepository extends PersistedDomainObjectRepository<WebPage>{

	WebPage findOneByName(String name);

}
