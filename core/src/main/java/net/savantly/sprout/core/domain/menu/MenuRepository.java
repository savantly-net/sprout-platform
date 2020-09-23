package net.savantly.sprout.core.domain.menu;

import java.util.Set;

import org.springframework.data.jpa.repository.Query;

import net.savantly.sprout.core.tenancy.TenantedJpaRepository;

public interface MenuRepository extends TenantedJpaRepository<Menu, String>{

	@Query("SELECT m from Menu m WHERE m.parent = null")
	public Set<Menu> findRootMenus();

}
