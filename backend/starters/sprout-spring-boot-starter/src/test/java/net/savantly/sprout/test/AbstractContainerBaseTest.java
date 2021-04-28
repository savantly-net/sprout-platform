package net.savantly.sprout.test;

import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.containers.PostgreSQLContainer;

public abstract class AbstractContainerBaseTest {

	protected static String dbName = "foo";
	protected static String username = "it_user";
	protected static String password = "it_pass";

	protected static final PostgreSQLContainer DB_CONTAINER = (PostgreSQLContainer) new PostgreSQLContainer("postgres:12")
			.withDatabaseName(dbName)
			.withUsername(username)
			.withPassword(password)
			//.withReuse(true)
			;

	static {
		DB_CONTAINER.start();
	}

	@DynamicPropertySource
	static void properties(DynamicPropertyRegistry registry) {
		registry.add("spring.datasource.url", DB_CONTAINER::getJdbcUrl);
		registry.add("spring.datasource.username", () -> username);
		registry.add("spring.datasource.password", () -> password);
		registry.add("spring.jpa.hibernate.ddl-auto", () -> "create-drop");
	}
}