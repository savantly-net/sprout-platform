package net.savantly.sprout.module.content.model.contentTemplate;

import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import net.savantly.sprout.core.domain.PersistedDomainObjectRepository;

@RepositoryRestResource(path="contentTemplates")
public interface ContentTemplateRepository extends PersistedDomainObjectRepository<ContentTemplate>{

	ContentTemplate findByName(String name);
}
