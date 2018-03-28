package net.savantly.sprout.core.security.role;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;

import net.savantly.sprout.core.security.privilege.PrivilegeFixture;
import net.savantly.sprout.core.security.privilege.PrivilegeRepository;

@SpringBootTest
@ContextConfiguration
@RunWith(SpringRunner.class)
@TestPropertySource("classpath:application.properties")
public class RoleFixtureTest {

	@Autowired
	RoleFixture fixture;

	@Test
	public void test() {
		fixture.install();
	}

	@Configuration
	@EnableAutoConfiguration
	@EnableJpaRepositories(basePackages = "net.savantly.sprout.core")
	@EntityScan(basePackages = "net.savantly.sprout.core")
	static class TestContext {
		
		@Bean
		public PasswordEncoder passwordEncoder() {
			return new PasswordEncoder() {
				
				@Override
				public boolean matches(CharSequence rawPassword, String encodedPassword) {
					return true;
				}
				
				@Override
				public String encode(CharSequence rawPassword) {
					return null;
				}
			};
		}

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
