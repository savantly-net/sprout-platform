package net.savantly.sprout.core.content.contentType;

import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import net.savantly.sprout.core.domain.PersistedDomainObjectRepository;

@RepositoryRestResource(path="contentTypes")
public interface ContentTypeRepository extends PersistedDomainObjectRepository<ContentType> {

	ContentType findByName(String name);
}
