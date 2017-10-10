package net.savantly.sprout.core.content.contentField;

import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import net.savantly.sprout.core.domain.PersistedDomainObjectRepository;

@RepositoryRestResource
public interface ContentFieldRepository extends PersistedDomainObjectRepository<ContentField>{

}
