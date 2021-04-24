package net.savantly.sprout.starter.migration;

import javax.annotation.PostConstruct;
import javax.sql.DataSource;

import org.flywaydb.core.Flyway;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class DefaultCoreDBMigrator implements CoreDBMigrator {
	
	private static final String CORE_SCHEMA_VERSION_TABLE = "app_schema_version";
	private final DataSource dataSource;

	@PostConstruct
    public void migrate() {
		DataSource source = (DataSource) dataSource;
        Flyway flyway = Flyway.configure()
        		.dataSource(source)
        		.locations(String.format("classpath:/META-INF/db/%s", getDbType(dataSource)))
        		// don't clean the db out!!!
        		.cleanDisabled(true)
        		.table(CORE_SCHEMA_VERSION_TABLE)
        		.baselineOnMigrate(true)
        		.baselineVersion("0")
        		.load();
        flyway.migrate();
    }

	//TODO: detect correct db type
	private String getDbType(DataSource dataSource2) {
		return "postgres";
	}

}
