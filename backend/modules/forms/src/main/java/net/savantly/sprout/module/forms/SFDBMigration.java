package net.savantly.sprout.module.forms;

import javax.sql.DataSource;

import org.flywaydb.core.Flyway;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import lombok.AllArgsConstructor;


@AllArgsConstructor
public class SFDBMigration {
	
	private static final Logger log = LoggerFactory.getLogger(SFDBMigration.class);
	private static final String SCHEMA_VERSION_TABLE = "sf_schema_version";
	private final DataSource dataSource;
	
    public void migrate() {
		DataSource source = (DataSource) dataSource;
        Flyway flyway = Flyway.configure()
        		.dataSource(source)
        		.locations(String.format("classpath:/net/savantly/sprout/module/forms/migrations/%s", getDbType(dataSource)))
        		// don't clean the db out!!!
        		.cleanDisabled(true)
        		.table(SCHEMA_VERSION_TABLE)
        		.baselineDescription("initial version")
        		.baselineOnMigrate(true)
        		.baselineVersion("0")
        		.load();
        log.info("migrating schema");
        flyway.migrate();
    }

	//TODO: detect correct db type
	private String getDbType(DataSource dataSource2) {
		return "postgres";
	}

}
