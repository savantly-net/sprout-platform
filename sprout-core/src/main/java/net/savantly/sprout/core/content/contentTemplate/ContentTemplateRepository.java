package net.savantly.sprout.core.content.contentTemplate;

import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import net.savantly.sprout.core.domain.PersistedDomainObjectRepository;

@RepositoryRestResource(path="contentTemplates")
public interface ContentTemplateRepository extends PersistedDomainObjectRepository<ContentTemplate>{

	ContentTemplate findByName(String name);
}
