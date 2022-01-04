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
import reactor.core.publisher.Flux;

@RestController
public class MenuApi {

	@Autowired
	MenuService menus;

	@GetMapping("/api/public/menu")
	public Flux<MenuDto> getPublicMenus() {
		Flux<MenuDto> folderDtoFlux =  Flux.defer(() -> Flux.fromIterable(this.menus.getRootMenus()));
		return folderDtoFlux;
	}

	@GetMapping("/api/menu")
	public Flux<MenuDto> getRootMenus() {
		Flux<MenuDto> folderDtoFlux =  Flux.defer(() -> Flux.fromIterable(this.menus.getRootMenus(false)));
		return folderDtoFlux;
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
