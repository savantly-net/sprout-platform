package net.savantly.sprout.starter.migration;

import org.junit.jupiter.api.Test;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.test.context.ActiveProfiles;

import com.fasterxml.jackson.databind.ObjectMapper;

import net.savantly.sprout.autoconfigure.properties.SproutConfigurationProperties;
import net.savantly.sprout.starter.JpaConfiguration;

@DataJpaTest
@ActiveProfiles("h2ddl")
public class H2DDLGeneration {
	
	@Test
	public void test() {
		//fake test for generating ddl
	}
	
	@Configuration
	@EnableAutoConfiguration
	static class TestContext{
		
		@Bean
		public SproutConfigurationProperties props() {
			return new SproutConfigurationProperties();
		}
		
		@Bean
		public ObjectMapper mapper() {
			return new ObjectMapper();
		}
		
		@Bean("CoreDBMigrator")
		public CoreDBMigrator fakeMigrator() {
			return new CoreDBMigrator() {};
		}
		
		@Bean
		public JpaConfiguration JpaConfiguration(SproutConfigurationProperties props) {
			return new JpaConfiguration(props);
		}
		
	}
}
