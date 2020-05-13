package net.savantly.sprout.starter;

import java.sql.SQLException;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.context.annotation.Configuration;
import org.springframework.test.context.TestPropertySource;

import net.savantly.sprout.core.security.role.RoleRepository;

@SpringBootTest(webEnvironment=WebEnvironment.RANDOM_PORT)
@TestPropertySource(locations="classpath:test.properties")
public class SchemaConfigurationTest {
	
	@Autowired
	private SchemaConfiguration config;
	@Autowired
	private RoleRepository repo;
	
	@Test
	public void testSchemaCreation() throws SQLException {
		String schema = "unit_test";
		config.ensureSchemaExists(schema);
		config.ensureTablesExist(schema);
	}
	
	@Configuration
	@EnableAutoConfiguration
	static class TestContext {}

}
