package net.savantly.sprout.autoconfigure;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringBootConfiguration;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Bean;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit.jupiter.web.SpringJUnitWebConfig;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.web.context.WebApplicationContext;

import net.savantly.sprout.core.domain.menu.Menu;
import net.savantly.sprout.core.domain.menu.MenuRepository;
import net.savantly.sprout.domain.menu.MenuApi;
import net.savantly.sprout.domain.menu.MenuService;

@SpringJUnitWebConfig
@WebMvcTest(controllers = {MenuApi.class})
public class SproutWebMvcAutoConfigurationTest {
	
	private static final Logger log = LoggerFactory.getLogger(SproutWebMvcAutoConfigurationTest.class);

	@Autowired
	WebApplicationContext ctx;	
	@MockBean
	MenuRepository repository;
	
	@Autowired
	private MockMvc mvc;
	
	
	@BeforeEach
	public void beforeEach() {
		Mockito.when(repository.findAll()).thenReturn(mockMenus());
		Mockito.when(repository.findRootMenus()).thenReturn(Arrays.asList(menu1()));
		Mockito.when(repository.findById("menu1")).thenReturn(Optional.of(menu1()));
		Mockito.when(repository.findById("menu2")).thenReturn(Optional.of(menu2()));
	}
	
	@Test
	@WithMockUser(authorities = {"ADMIN"})
	public void testMenuApi() throws Exception {
		
		MvcResult result = mvc.perform(get("/api/menu")).andExpect(status().isOk()).andReturn();
		
		log.info(result.getResponse().getContentAsString());
		
		mvc.perform(delete("/api/menu/menu2"));
		
		result = mvc.perform(get("/api/menu")).andExpect(status().isOk()).andReturn();
		
		log.info(result.getResponse().getContentAsString());
	}
	
	private List<Menu> mockMenus() {
		return Arrays.asList(menu1(), menu2());
	}
	
	private Menu menu1() {
		Set<String> roles = new HashSet<>();
		roles.add("user");
		Menu menu = new Menu();
		menu.setId("menu1");
		menu.set_public(true);
		menu.setDisplayText("a test");
		menu.setAuthorities(roles);
		menu.setName("menu1");
		return menu;
	}
	
	private Menu menu2() {
		Set<String> roles = new HashSet<>();
		roles.add("user");
		Menu menu2 = new Menu();
		menu2.setId("menu2");
		menu2.set_public(true);
		menu2.setDisplayText("a test");
		menu2.setAuthorities(roles);
		menu2.setParentName("menu1");
		menu2.setName("menu2");
		return menu2;
	}
	
	
	@SpringBootConfiguration
	static class TestContext{
		
		@Bean
		public MenuApi menuApi() {
			return new MenuApi();
		}
		
		@Bean
		public MenuService menuService(MenuRepository repository) {
			return new MenuService(repository, Arrays.asList());
		}
		
	}
	
}
