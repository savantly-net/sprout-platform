package net.savantly.sprout.module.forms;

import javax.sql.DataSource;

import org.flywaydb.core.Flyway;

import lombok.AllArgsConstructor;


@AllArgsConstructor
public class SFDBMigration {
	
	private static final String SCHEMA_VERSION_TABLE = "sf_schema_version";
	private final DataSource dataSource;
	
    public void migrate() {
		DataSource source = (DataSource) dataSource;
        Flyway flyway = Flyway.configure()
        		.dataSource(source)
        		.locations(String.format("classpath:/sf/db/%s", getDbType(dataSource)))
        		// don't clean the db out!!!
        		.cleanDisabled(true)
        		.table(SCHEMA_VERSION_TABLE)
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
