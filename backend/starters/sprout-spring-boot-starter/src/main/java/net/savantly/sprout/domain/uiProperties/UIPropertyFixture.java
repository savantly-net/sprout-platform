package net.savantly.sprout.domain.uiProperties;

import java.util.ArrayList;
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
		
		ArrayList<UIProperty> propsFromConfig = new ArrayList<UIProperty>();
		// add ui properties from config first
		// always overwrite the stored value with the configured value
		this.props.getUiProperties().forEach(d -> {
			List<UIProperty> existing = this.repository.findByName(d.getName());
			if (existing.isEmpty()) {
				log.info("adding property from config: " + d.getName() + ":\"" + d.getValue() + "\"");
				propsFromConfig.add(d);
			} else {
				UIProperty prop = existing.get(0);
				prop.setValue(d.getValue());
				propsFromConfig.add(prop);
			}
		});
		// save the props from config, so the defaults don't overwrite them.
		repository.saveAll(propsFromConfig);
		
		// and add the defaults if they don't already exist
		UIPropertyDefaults.getDefaults().forEach(d -> {
			if (this.repository.findByName(d.getName()).isEmpty()) {
				log.info("adding property from defaults: " + d.getName() + ":\"" + d.getValue() + "\"");
				entityList.add(d);
			}
		});
		
		this.addIfMissing(WellKnownUIProp.REQUIRE_AUTHENTICATION, "false", entityList);
	}
	
	private void addIfMissing(WellKnownUIProp prop, String value, List<UIProperty> entityList) {
		if (this.repository.findByName(prop.name()).isEmpty()) {
			log.info("adding property from defaults: " + prop.name() + ":\"" + value + "\"");
			entityList.add(new UIProperty().setName(prop.name()).setValue(value));
		}
	}

	@Override
	public void addDependencies(List<Fixture<?>> dependencies) {}

}
