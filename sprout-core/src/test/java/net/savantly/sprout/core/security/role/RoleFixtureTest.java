package net.savantly.sprout.core.security.role;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;

import net.savantly.sprout.core.DataIntegrationTest;
import net.savantly.sprout.core.security.privilege.PrivilegeFixture;
import net.savantly.sprout.core.security.privilege.PrivilegeRepository;

@DataIntegrationTest
public class RoleFixtureTest {

	@Autowired
	RoleFixture fixture;

	@Test
	public void test() {
		fixture.install();
	}

	@TestConfiguration
	static class TestContext {

		@Bean
		public RoleFixture fixture(RoleRepository repository, PrivilegeFixture privilegeFixture,
				PrivilegeRepository privilegeRepository) {
			return new RoleFixture(repository, privilegeFixture, privilegeRepository);
		}

		@Bean
		PrivilegeFixture privilegeFixture(PrivilegeRepository repository) {
			return new PrivilegeFixture(repository);
		}
	}
}
