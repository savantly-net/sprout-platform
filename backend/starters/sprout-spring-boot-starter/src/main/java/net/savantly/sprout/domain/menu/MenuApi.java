package net.savantly.sprout.domain.menu;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import net.savantly.sprout.core.domain.menu.Menu;
import net.savantly.sprout.core.domain.menu.MenuRepository;

@RestController
@RequestMapping("/api/menu")
public class MenuApi {
	
	@Autowired
	MenuRepository repo;
	
	@GetMapping
	public Set<Menu> getRootMenus(){
		return this.repo.findRootMenus();
	}

}
