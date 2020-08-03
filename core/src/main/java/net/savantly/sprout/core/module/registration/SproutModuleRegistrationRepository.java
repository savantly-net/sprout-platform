package net.savantly.sprout.core.module.registration;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

@Repository
@RepositoryRestResource(path="module-registrations", collectionResourceRel="moduleRegistrations")
public interface SproutModuleRegistrationRepository extends CrudRepository<SproutModuleRegistration, String> {

}
