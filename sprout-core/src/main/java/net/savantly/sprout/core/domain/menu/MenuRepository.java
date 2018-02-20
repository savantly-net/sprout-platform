package net.savantly.sprout.core.domain.menu;

import java.util.Set;

import org.springframework.data.jpa.repository.Query;

import net.savantly.sprout.core.domain.PersistedDomainObjectRepository;

public interface MenuRepository extends PersistedDomainObjectRepository<Menu>{

	@Query("SELECT m from Menu m WHERE m.parent = null")
	public Set<Menu> findRootMenus();

}
