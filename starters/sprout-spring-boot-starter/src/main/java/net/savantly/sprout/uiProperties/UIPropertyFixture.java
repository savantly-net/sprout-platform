package net.savantly.sprout.uiProperties;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import net.savantly.spring.fixture.AbstractBaseFixture;
import net.savantly.spring.fixture.Fixture;
import net.savantly.sprout.autoconfigure.properties.SproutConfigurationProperties;

@Transactional
public class UIPropertyFixture extends AbstractBaseFixture<UIProperty, UIPropertyRepository> {

	private static final Logger log = LoggerFactory.getLogger(UIPropertyFixture.class);
	@Autowired
	private SproutConfigurationProperties props;
	private UIPropertyRepository repository;

	public UIPropertyFixture(UIPropertyRepository repository) {
		super(repository);
		this.repository = repository;
	}

	@Override
	public void addEntities(List<UIProperty> entityList) {
		
		// add ui properties from config first
		this.props.getUiProperties().forEach(d -> {
			if (this.repository.findByName(d.getName()).isEmpty()) {
				log.info("adding property from config: " + d.getName() + ":\"" + d.getValue() + "\"");
				entityList.add(d);
			}
		});
		
		// and add the defaults if they don't already exist
		UIPropertyDefaults.getDefaults().forEach(d -> {
			if (this.repository.findByName(d.getName()).isEmpty()) {
				log.info("adding property from defaults: " + d.getName() + ":\"" + d.getValue() + "\"");
				entityList.add(d);
			}
		});
	}

	@Override
	public void addDependencies(List<Fixture<?>> dependencies) {}

}
