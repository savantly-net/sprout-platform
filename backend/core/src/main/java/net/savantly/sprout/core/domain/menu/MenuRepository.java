package net.savantly.sprout.core.domain.menu;

import java.util.List;

import org.springframework.data.jpa.repository.Query;

import net.savantly.sprout.core.tenancy.TenantedJpaRepository;

public interface MenuRepository extends TenantedJpaRepository<Menu, String>{

	@Query("SELECT m from Menu m WHERE m.parentName = null")
	public List<Menu> findRootMenus();
	public List<Menu> findByName(String name);
	public List<Menu> findByParentName(String name);

}
