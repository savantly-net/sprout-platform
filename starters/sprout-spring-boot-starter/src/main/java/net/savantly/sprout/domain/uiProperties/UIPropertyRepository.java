package net.savantly.sprout.uiProperties;

import java.util.List;

import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import net.savantly.sprout.core.tenancy.TenantedJpaRepository;

@RepositoryRestResource(path="uiProperties")
public interface UIPropertyRepository extends TenantedJpaRepository<UIProperty, String> {
	
	List<UIProperty> findByName(String settingName);

}
