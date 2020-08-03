package net.savantly.sprout.module.content.model.contentItem;

import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.Set;
import net.savantly.sprout.core.domain.PersistedDomainObjectRepository;

@RepositoryRestResource(path="contentItems", collectionResourceRel="contentItems")
public interface ContentItemRepository extends PersistedDomainObjectRepository<ContentItem> {

	public Set<ContentItem> findAllByContentType_id(String contentTypeId);
	ContentItem findByName(String name);
}
