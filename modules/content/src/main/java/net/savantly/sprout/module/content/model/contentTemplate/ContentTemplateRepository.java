package net.savantly.sprout.module.content.model.contentTemplate;

import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import net.savantly.sprout.core.domain.PersistedDomainObjectRepository;

@RepositoryRestResource(path="contentTemplates", collectionResourceRel = "contentTemplates")
public interface ContentTemplateRepository extends PersistedDomainObjectRepository<ContentTemplateImpl>{

	ContentTemplateImpl findByName(@Param("name") String name);
}
