package net.savantly.sprout.starter;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import net.savantly.spring.fixture.Fixture;
import net.savantly.sprout.core.domain.emailAddress.EmailAddress;
import net.savantly.sprout.core.domain.emailAddress.EmailAddressFixture;
import net.savantly.sprout.core.domain.emailAddress.repository.EmailAddressRepository;
import net.savantly.sprout.core.domain.user.UserFixture;
import net.savantly.sprout.core.domain.user.repository.UserRepository;
import net.savantly.sprout.core.security.privilege.PrivilegeFixture;
import net.savantly.sprout.core.security.privilege.PrivilegeRepository;
import net.savantly.sprout.core.security.role.Role;
import net.savantly.sprout.core.security.role.RoleFixture;
import net.savantly.sprout.core.security.role.RoleRepository;
import net.savantly.sprout.domain.uiProperties.UIPropertyFixture;
import net.savantly.sprout.domain.uiProperties.UIPropertyRepository;

@Configuration
public class SproutFixturesConfiguration {

	public SproutFixturesConfiguration() {
		// TODO Auto-generated constructor stub
	}

	@Bean
	protected UIPropertyFixture appSettingFixture(UIPropertyRepository repository) {
		return new UIPropertyFixture(repository);
	}

	@Bean
	protected RoleFixture roleFixture(RoleRepository repository, PrivilegeFixture privFixture, PrivilegeRepository privRepository) {
		return new RoleFixture(repository, privFixture, privRepository);
	}

	@Bean
	protected PrivilegeFixture privilegeFixture(PrivilegeRepository privRepository) {
		return new PrivilegeFixture(privRepository);
	}

	@Bean
	protected EmailAddressFixture emailFixture(EmailAddressRepository repository) {
		return new EmailAddressFixture(repository);
	}

	@Bean
	protected UserFixture userFixture(UserRepository repository, PasswordEncoder passwordEncoder,
			EmailAddressRepository emailAddressRepository, RoleRepository roleRepository, Fixture<Role> roleFixture,
			Fixture<EmailAddress> emailFixture) {
		return new UserFixture(repository, passwordEncoder, emailAddressRepository, roleRepository, roleFixture,
				emailFixture);
	}

}