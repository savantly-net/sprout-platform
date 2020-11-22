package net.savantly.sprout.domain.privileges;

import java.util.List;

import net.savantly.spring.fixture.AbstractBaseFixture;
import net.savantly.spring.fixture.Fixture;
import net.savantly.sprout.autoconfigure.properties.SproutConfigurationProperties;
import net.savantly.sprout.core.security.privilege.Privilege;
import net.savantly.sprout.core.security.privilege.PrivilegeRepository;

public class PrivilegeFixture extends AbstractBaseFixture<Privilege, PrivilegeRepository> {
	
	private final PrivilegeRepository repository;
	private final SproutConfigurationProperties config;

	public PrivilegeFixture(PrivilegeRepository repository, SproutConfigurationProperties config) {
		super(repository);
		this.repository = repository;
		this.config = config;
	}
	
	@Override
	public void addEntities(List<Privilege> entityList) {
		config.getSecurity().getAuthorization().getBootstrapPermissions().forEach(b -> {
			b.getPermissions().forEach(p -> {
				List<Privilege> foundPermissions = this.repository.findByName(p);
				if (foundPermissions.isEmpty()) {
					entityList.add(new Privilege().setName(p));
				}
			});
		});
		
	}

	@Override
	public void addDependencies(List<Fixture<?>> dependencies) {
		// TODO Auto-generated method stub
		
	}
}
