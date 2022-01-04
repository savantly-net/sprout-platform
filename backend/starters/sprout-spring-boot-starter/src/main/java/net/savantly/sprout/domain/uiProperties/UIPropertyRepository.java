package net.savantly.sprout.domain.uiProperties;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;


@RepositoryRestResource(path="uiProperties")
//public interface UIPropertyRepository extends JpaRepository<UIProperty,Object> { //extends TenantedJpaRepository<UIProperty, String> {
public interface UIPropertyRepository extends CrudRepository<UIProperty,Object> { //extends TenantedJpaRepository<UIProperty, String> {

	List<UIProperty> findByName(String settingName);

}