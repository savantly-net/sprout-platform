package net.savantly.sprout.core.content.contentItem;

import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.Set;
import net.savantly.sprout.core.domain.PersistedDomainObjectRepository;

@RepositoryRestResource
public interface ContentItemRepository extends PersistedDomainObjectRepository<ContentItem> {

	public Set<ContentItem> findAllByContentType_id(String contentTypeId);
}
