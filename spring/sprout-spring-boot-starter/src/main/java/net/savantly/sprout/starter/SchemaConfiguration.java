package net.savantly.sprout.starter;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.EnumSet;
import java.util.HashMap;
import java.util.Map;

import javax.sql.DataSource;

import org.hibernate.boot.MetadataSources;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import org.hibernate.tool.hbm2ddl.SchemaExport;
import org.hibernate.tool.hbm2ddl.SchemaExport.Action;
import org.hibernate.tool.schema.TargetType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.jdbc.DataSourceProperties;
import org.springframework.boot.autoconfigure.orm.jpa.JpaProperties;
import org.springframework.context.ApplicationContext;

import net.savantly.sprout.autoconfigure.SproutRepositoryRestAutoConfiguration;

public class SchemaConfiguration implements InitializingBean {
	private static Logger log = LoggerFactory.getLogger(SchemaConfiguration.class);
	public static String DEFAULT_SCHEMA = "sprout";
	// public static String NAMING_STRATEGY = "org.springframework.boot.orm.jpa.hibernate.SpringPhysicalNamingStrategy"; // org.hibernate.cfg.ImprovedNamingStrategy; // "org.springframework.boot.orm.jpa.SpringNamingStrategy";

	@Autowired
	private DataSourceProperties dataSourceProperties;
    @Autowired
    private JpaProperties jpaProperties;  
	@Autowired
	private DataSource dataSource;
	@Autowired
	private ApplicationContext ctx;
	
	public void ensureSchemaExists(String schema) throws SQLException {
		boolean exists = false;
		Connection connection = this.dataSource.getConnection();
		ResultSet schemaResultSet = connection.getMetaData().getSchemas();
		while (schemaResultSet.next()){
			String test = schemaResultSet.getString(1).toLowerCase();
			if (schema.equals(test)) {
				exists = true;
				break;
			}
		}
		
		if(!exists) {
			connection.createStatement().execute("CREATE SCHEMA " + schema);
		}
	}
	
	public void ensureTablesExist(String schema) throws SQLException {
		boolean exists = false;
		Connection connection = this.dataSource.getConnection();
		ResultSet schemaResultSet = connection.getMetaData().getTables(null, schema, null, null);
		while (schemaResultSet.next()){
			String test = schemaResultSet.getString("TABLE_NAME");
			log.info("found table: {}", test);
			exists = true;
		}
		
		if(!exists) {
			this.scaffoldSchema(schema);
			SproutFixtures fixtures = ctx.getBean(SproutFixtures.class);
			fixtures.installFixtures(schema);
		}
	}
	
	public void scaffoldSchema(String schema) {

        StandardServiceRegistryBuilder builder = new StandardServiceRegistryBuilder();
        builder.applySettings(getDataSourceSettings(schema));
		MetadataSources metadata = new MetadataSources(builder.build());
        
        for (Class clazz : SproutRepositoryRestAutoConfiguration.ENTITIES) {
			metadata.addAnnotatedClass(clazz);
		}
        
        SchemaExport schemaExport = new SchemaExport();
        schemaExport.setHaltOnError(false);
        schemaExport.setFormat(true);
        schemaExport.setDelimiter(";");
        schemaExport.setOutputFile("db-schema.sql");
        EnumSet<TargetType> targetTypes = EnumSet.of(TargetType.SCRIPT, TargetType.DATABASE);
		schemaExport.execute(targetTypes, Action.CREATE, metadata.buildMetadata());
	}
	
	private Map<String, String> getDataSourceSettings(String schema) {
        Map<String, String> settings = new HashMap<>();
        settings.putAll(jpaProperties.getProperties());
        settings.put("connection.driver_class", dataSourceProperties.determineDriverClassName());
        settings.put("hibernate.connection.url", dataSourceProperties.determineUrl());
        settings.put("hibernate.connection.username", dataSourceProperties.determineUsername());
        settings.put("hibernate.connection.password", dataSourceProperties.determinePassword());
        /*settings.put("hibernate.physical_naming_strategy", NAMING_STRATEGY);*/
        settings.put("hibernate.ddl-auto", "create");
        settings.put("show_sql", "true");
        settings.put("hibernate.default_schema", schema);
        return settings;
	}
	
	@Override
	public void afterPropertiesSet() throws Exception {
		this.ensureSchemaExists(DEFAULT_SCHEMA);
		this.ensureTablesExist(DEFAULT_SCHEMA);
	}
}
