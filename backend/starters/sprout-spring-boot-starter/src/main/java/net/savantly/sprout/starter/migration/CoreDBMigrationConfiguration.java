package net.savantly.sprout.starter.migration;

import javax.sql.DataSource;

import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.autoconfigure.flyway.FlywayMigrationStrategy;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CoreDBMigrationConfiguration {
	
	@Bean
	@ConditionalOnMissingBean
	public FlywayMigrationStrategy defaultFlywayMigrationStrategy() {
		return (flyway) -> {};
	}
	
	@Bean("CoreDBMigrator")
	@ConditionalOnMissingBean(name = "CoreDBMigrator")
	public CoreDBMigrator defaultCoreDBMigrator(DataSource dataSource) {
		return new DefaultCoreDBMigrator(dataSource);
	}

}
