package net.savantly.sprout.core.content.webPageLayout;

import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import net.savantly.sprout.core.domain.PersistedDomainObjectRepository;

@RepositoryRestResource
public interface WebPageLayoutRepository extends PersistedDomainObjectRepository<WebPageLayout> {

	WebPageLayout findOneByName(String name);
}
