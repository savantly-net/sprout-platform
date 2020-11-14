package net.savantly.sprout.domain.menu;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/public/menu")
public class MenuApi {
	
	@Autowired
	MenuService menus;
	
	@GetMapping
	public List<MenuDto> getRootMenus(){
		return this.menus.getRootMenus();
	}

}
