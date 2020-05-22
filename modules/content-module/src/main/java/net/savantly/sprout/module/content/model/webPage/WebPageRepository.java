package net.savantly.sprout.module.content.model.webPage;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import net.savantly.sprout.core.domain.PersistedDomainObjectRepository;

@RepositoryRestResource
public interface WebPageRepository extends PersistedDomainObjectRepository<WebPage>{

	WebPage findOneByName(String name);
	@Query("SELECT p FROM WebPage p WHERE p.home = 1")
	WebPage findHomePage();

}
