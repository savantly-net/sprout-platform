package net.savantly.sprout.starter;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import net.savantly.spring.fixture.Fixture;
import net.savantly.sprout.core.content.contentTemplate.ContentTemplateFixture;
import net.savantly.sprout.core.content.contentTemplate.ContentTemplateRepository;
import net.savantly.sprout.core.content.contentType.ContentTypeFixture;
import net.savantly.sprout.core.content.contentType.ContentTypeRepository;
import net.savantly.sprout.core.content.webPage.WebPageFixture;
import net.savantly.sprout.core.content.webPage.WebPageRepository;
import net.savantly.sprout.core.content.webPageLayout.WebPageLayoutFixture;
import net.savantly.sprout.core.content.webPageLayout.WebPageLayoutRepository;
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
import net.savantly.sprout.settings.AppSettingFixture;
import net.savantly.sprout.settings.AppSettingRepository;

@Configuration
public class SproutFixturesConfiguration {

	public SproutFixturesConfiguration() {
		// TODO Auto-generated constructor stub
	}

	@Bean
	protected AppSettingFixture appSettingFixture(AppSettingRepository repository) {
		return new AppSettingFixture(repository);
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
	protected WebPageLayoutFixture webPageLayoutFixture(WebPageLayoutRepository repository) {
		return new WebPageLayoutFixture(repository);
	}

	@Bean
	protected WebPageFixture webPageFixture(WebPageRepository wpRepository, WebPageLayoutRepository wplRepository,
			WebPageLayoutFixture wplFixture) {
		return new WebPageFixture(wpRepository, wplRepository, wplFixture);
	}

	@Bean
	protected UserFixture userFixture(UserRepository repository, PasswordEncoder passwordEncoder,
			EmailAddressRepository emailAddressRepository, RoleRepository roleRepository, Fixture<Role> roleFixture,
			Fixture<EmailAddress> emailFixture) {
		return new UserFixture(repository, passwordEncoder, emailAddressRepository, roleRepository, roleFixture,
				emailFixture);
	}

	@Bean
	protected ContentTypeFixture contentTypeFixture(ContentTypeRepository repository) {
		return new ContentTypeFixture(repository);
	}

	@Bean
	protected ContentTemplateFixture contentTemplateFixture(ContentTemplateRepository templateRepository) {
		return new ContentTemplateFixture(templateRepository);
	}

}