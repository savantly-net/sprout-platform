package net.savantly.sprout.module.content.model.contentField;

import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import net.savantly.sprout.core.domain.PersistedDomainObjectRepository;

@RepositoryRestResource
public interface ContentFieldRepository extends PersistedDomainObjectRepository<ContentField>{

}
