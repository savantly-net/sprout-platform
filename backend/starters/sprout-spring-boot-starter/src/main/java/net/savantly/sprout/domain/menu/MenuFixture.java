package net.savantly.sprout.domain.menu;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import net.savantly.spring.fixture.AbstractBaseFixture;
import net.savantly.spring.fixture.Fixture;
import net.savantly.sprout.autoconfigure.properties.SproutConfigurationProperties;
import net.savantly.sprout.core.domain.menu.Menu;
import net.savantly.sprout.core.domain.menu.MenuRepository;

public class MenuFixture extends AbstractBaseFixture<Menu, MenuRepository> {
	
	private static final Logger log = LoggerFactory.getLogger(MenuFixture.class);

	@Autowired
	private SproutConfigurationProperties props;
	@Autowired
	private MenuService service;

	public MenuFixture(MenuRepository repository) {
		super(repository);
	}
	
	/* bypassing normal addition of entities because we handle a recursive function */
	@Override
	public void addEntities(List<Menu> entityList) {	
		service.upsertMenus(this.props.getMenus());
	}

	@Override
	public void addDependencies(List<Fixture<?>> dependencies) {
		// TODO Auto-generated method stub
		
	}
	
}
