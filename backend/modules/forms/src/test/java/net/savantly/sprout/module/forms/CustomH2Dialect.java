package net.savantly.sprout.module.forms;

import java.sql.Types;

import org.hibernate.dialect.H2Dialect;

public class CustomH2Dialect extends H2Dialect {
	
	// Catch other column types as varchar, specifically for the 'jsonb' column
	public CustomH2Dialect() {
		this.registerColumnType(Types.OTHER, "varchar(56000)");
	}

}
