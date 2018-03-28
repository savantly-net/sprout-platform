package net.savantly.sprout.core.domain.menu;

import java.util.HashSet;
import java.util.Set;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.support.PageableExecutionUtils;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@ContextConfiguration
@TestPropertySource("classpath:application.properties")
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
		
		menu.setItems(items);
		
		repository.save(menu);
		
		repository.findRootMenus();
	}
	
	@Configuration
	@SpringBootApplication
	@EnableJpaRepositories(basePackages="net.savantly.sprout.core.domain.menu")
	@EntityScan(basePackages="net.savantly.sprout.core.domain.menu")
	static class configuration {

	}

}
