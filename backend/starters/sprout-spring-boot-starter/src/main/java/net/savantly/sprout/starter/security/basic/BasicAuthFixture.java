package net.savantly.sprout.starter.security.basic;

import java.util.List;

import org.springframework.transaction.annotation.Transactional;

import net.savantly.spring.fixture.AbstractBaseFixture;
import net.savantly.spring.fixture.Fixture;
import net.savantly.sprout.autoconfigure.properties.SproutConfigurationProperties;
import net.savantly.sprout.autoconfigure.properties.SproutConfigurationProperties.BasicCreds;
import net.savantly.sprout.core.domain.role.RoleFixture;
import net.savantly.sprout.core.domain.user.SproutUserEntity;
import net.savantly.sprout.core.domain.user.repository.UserRepository;
import net.savantly.sprout.core.security.users.SproutUserService;
import net.savantly.sprout.starter.security.permissions.PermissionsFixture;

/**
 * Creates default basic auth credentials if enabled
 * 
 * @author jeremybranham
 *
 */
@Transactional
public class BasicAuthFixture extends AbstractBaseFixture<SproutUserEntity, UserRepository> {

	private SproutConfigurationProperties props;
	private SproutUserService userService;
	private PermissionsFixture roles;

	public BasicAuthFixture(SproutConfigurationProperties props, UserRepository repository, SproutUserService userService, PermissionsFixture roles) {
		super(repository);
		this.props = props;
		this.userService = userService;
		this.roles = roles;
	}

	@Override
	public void addEntities(List<SproutUserEntity> entityList) {
		props.getSecurity().getAuthentication().getBasic().getUsers().forEach(u -> {
			addIfMissing(u);
		});
	}

	private void addIfMissing(BasicCreds user) {

		if (userService.usernameExists(user.getUsername())) {
			return;
		} else {
			userService.createUser(user.getUsername(), user.getPassword(), user.getEmailAddress(), user.getRoles());
		}
	}


	@Override
	public void addDependencies(List<Fixture<?>> dependencies) {
		dependencies.add(roles);
	}

}
