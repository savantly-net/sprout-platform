package net.savantly.sprout.core.security.privilege;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;

import net.savantly.sprout.core.DataIntegrationTest;

@DataIntegrationTest
public class PrivilegeFixtureTest {

	@Autowired
	PrivilegeFixture fixture;
	
	@Test
	public void test() {
		fixture.install();
	}
	
	@TestConfiguration
	static class TestContext {
		
		@Bean
		public PrivilegeFixture fixture(PrivilegeRepository repository) {
			return new PrivilegeFixture(repository);
		}
	}
}
