package net.savantly.sprout.starter.migration;

import javax.sql.DataSource;

import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.autoconfigure.flyway.FlywayMigrationStrategy;
import org.springframework.context.annotation.Bean;

public class CoreDBMigrationConfiguration {
	
	@Bean
	@ConditionalOnMissingBean
	public FlywayMigrationStrategy defaultFlywayMigrationStrategy() {
		return (flyway) -> {};
	}
	
	@Bean
	@ConditionalOnMissingBean
	public CoreDBMigrator defaultCoreDBMigrator(DataSource dataSource) {
		return new DefaultCoreDBMigrator(dataSource);
	}

}
