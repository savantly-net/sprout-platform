package net.savantly.sprout.core.domain.menu;

import java.util.HashSet;
import java.util.Set;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import net.savantly.sprout.core.DataIntegrationTest;

@DataIntegrationTest
public class MenuRepositoryTest {
	
	@Autowired
	MenuRepository repository;
	
	
	@Test
	public void test() {
		Set<String> roles = new HashSet<>();
		roles.add("user");
		
		Menu menu = new Menu();
		menu.set_public(true);
		menu.setDisplayText("a test");
		menu.setRoles(roles);
		
		Menu menu2 = new Menu();
		menu2.set_public(true);
		menu2.setDisplayText("a test");
		menu2.setRoles(roles);
		
		HashSet<Menu> items = new HashSet<>();
		items.add(menu2);
		
		repository.save(menu);
		
		repository.findRootMenus();
	}
}