package net.savantly.sprout.core.content.contentTemplate;

import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import net.savantly.sprout.core.domain.PersistedDomainObjectRepository;

@RepositoryRestResource
public interface ContentTemplateRepository extends PersistedDomainObjectRepository<ContentTemplate>{

}
