package net.savantly.sprout.core.security.privilege;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;

@ContextConfiguration
@RunWith(SpringRunner.class)
public class PrivilegeFixtureTest {

	@Autowired
	PrivilegeFixture fixture;
	
	@Test
	public void test() {
		fixture.install();
	}
	
	@Configuration
	@EnableAutoConfiguration
	@EntityScan(basePackages="net.savantly.sprout.core")
	static class TestContext {
		
		@Bean
		public PrivilegeFixture fixture(PrivilegeRepository repository) {
			return new PrivilegeFixture(repository);
		}
	}
}
