package net.savantly.sprout.domain.menu;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MenuApi {

	@Autowired
	MenuService menus;

	@GetMapping("/api/public/menu")
	public List<MenuDto> getPublicMenus() {
		return this.menus.getRootMenus();
	}

	@GetMapping("/api/menu")
	public List<MenuDto> getRootMenus() {
		return this.menus.getRootMenus(false);
	}

	@PreAuthorize("hasAuthority('ADMIN')")
	@PostMapping("/api/menu")
	public void updateMenus(@RequestBody List<MenuDto> menuDtos) {
		this.menus.upsertMenus(menuDtos);
	}

	@PreAuthorize("hasAuthority('ADMIN')")
	@DeleteMapping("/api/menu/{id}")
	public void deleteMenuById(@PathVariable("id") String id) {
		this.menus.deleteMenuById(id);
	}

}
