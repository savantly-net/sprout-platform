package net.savantly.sprout.domain.menu;

import java.net.URI;
import java.util.ArrayList;
import java.util.Objects;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;

import net.savantly.sprout.autoconfigure.properties.SproutConfigurationProperties;
import net.savantly.sprout.core.domain.menu.MenuRepository;
import net.savantly.sprout.core.domain.role.RoleRepository;
import net.savantly.sprout.core.security.FakeContext;
import net.savantly.sprout.test.AbstractContainerBaseTest;
import net.savantly.sprout.test.IntegrationTest;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT, properties = {"sprout.dashboards.enable-menu-items=false"})
@IntegrationTest
@ActiveProfiles({"menus"})
public class MenuApiTest extends AbstractContainerBaseTest {

	@Autowired
	private TestRestTemplate rest;
	@Autowired
	private MenuRepository menuRepo;
	@Autowired
	private SproutConfigurationProperties props;
	@Autowired
	private MenuService service;
    @Autowired
    private RoleRepository roleRepository;   
	
	@BeforeEach
	public void beforeEach() {
		menuRepo.deleteAll();

    	FakeContext fakeContext = new FakeContext();
        fakeContext.create(this.roleRepository);
		service.upsertMenus(props.getMenus());
		menuRepo.flush();
	}
	
	@Test
	public void menuFromConfigTestWithAdminAuthority() throws Exception {
		String url = "/api/public/menu";
		RequestEntity request = RequestEntity.get(new URI(url)).build();
		ResponseEntity<MenuDtoList> response = rest.withBasicAuth("admin", "admin").exchange(request, MenuDtoList.class);
		Assertions.assertEquals(HttpStatus.OK, response.getStatusCode(), "Should get the menus configured from props");
		Assertions.assertTrue(Objects.nonNull(response.getBody()));
		Assertions.assertEquals(3, response.getBody().size(), "there should be the correct number of root menus");
		Assertions.assertEquals(2, response.getBody().get(0).getChildren().size(), "there should be the correct number of child menus");
		Assertions.assertEquals(1, response.getBody().get(0).getChildren().get(0).getChildren().size(), "there should be the correct number of grandchild menus");
		Assertions.assertEquals(2, response.getBody().get(1).getChildren().size(), "there should be the correct number of child menus");
		Assertions.assertEquals(1, response.getBody().get(1).getChildren().get(0).getChildren().size(), "there should be the correct number of grandchild menus");
	}
	
	@Test
	public void menuFromConfigTestWithAnonymousUser() throws Exception {
		String url = "/api/public/menu";
		RequestEntity request = RequestEntity.get(new URI(url)).build();
		ResponseEntity<MenuDtoList> response = rest.exchange(request, MenuDtoList.class);
		Assertions.assertEquals(HttpStatus.OK, response.getStatusCode(), "Should get the menus configured from props");
		Assertions.assertTrue(Objects.nonNull(response.getBody()));
		Assertions.assertEquals(2, response.getBody().size(), "there should be the correct number of root menus");
		Assertions.assertEquals(2, response.getBody().get(0).getChildren().size(), "there should be the correct number of child menus");
		Assertions.assertEquals(1, response.getBody().get(0).getChildren().get(0).getChildren().size(), "there should be the correct number of grandchild menus");
		Assertions.assertEquals(2, response.getBody().get(1).getChildren().size(), "there should be the correct number of child menus");
		Assertions.assertEquals(1, response.getBody().get(1).getChildren().get(0).getChildren().size(), "there should be the correct number of grandchild menus");
	}
	
	public static class MenuDtoList extends ArrayList<MenuDto> {
		public MenuDtoList() {}
	}
	
	@Configuration
	@EnableAutoConfiguration
	static class TestContext {

	}
}
