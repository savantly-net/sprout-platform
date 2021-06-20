package net.savantly.sprout.starter.migration;

import org.junit.jupiter.api.Test;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.ActiveProfiles;

import net.savantly.sprout.autoconfigure.SproutAutoConfiguration;

@SpringBootTest
@ActiveProfiles("postgresddl")
public class PostgresDDLGeneration {

	@Test
	public void test() {
		//fake test for generating ddl
	}
	
	@Configuration
	@EnableAutoConfiguration
	@Import(SproutAutoConfiguration.class)
	static class TestContext{
		
	}
}
