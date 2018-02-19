package net.savantly.sprout.core.content.contentItem;

import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import net.savantly.sprout.core.domain.PersistedDomainObjectRepository;

@RepositoryRestResource
public interface ContentItemRepository extends PersistedDomainObjectRepository<ContentItem> {

	ContentItem findByName(String name);
}
