package net.savantly.sprout.module.forms;

import java.sql.Types;

import org.hibernate.dialect.H2Dialect;
import org.hibernate.type.TextType;

public class CustomH2Dialect extends H2Dialect {
	
	public CustomH2Dialect() {
		this.registerColumnType(Types.OTHER, "varchar(56000)");
		this.registerHibernateType(
	            Types.OTHER, TextType.class.getName()
	        );
	}

}
