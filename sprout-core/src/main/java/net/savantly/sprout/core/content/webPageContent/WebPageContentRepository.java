package net.savantly.sprout.core.content.webPageContent;

import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import net.savantly.sprout.core.domain.PersistedDomainObjectRepository;

@RepositoryRestResource(path="webPageContents")
public interface WebPageContentRepository extends PersistedDomainObjectRepository<WebPageContent> {

}
