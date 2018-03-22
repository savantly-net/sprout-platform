package net.savantly.sprout.tenancy;

import java.sql.Connection;
import java.sql.SQLException;

import javax.sql.DataSource;

import org.hibernate.HibernateException;
import org.hibernate.engine.jdbc.connections.spi.MultiTenantConnectionProvider;

import net.savantly.sprout.starter.SchemaConfiguration;

public class MultiTenantConnectionProviderImpl implements MultiTenantConnectionProvider {

	private DataSource dataSource;
	
	public MultiTenantConnectionProviderImpl(DataSource ds) {
		this.dataSource = ds;
	}
	
    @Override
    public Connection getAnyConnection() throws SQLException {
        return dataSource.getConnection();
    }
    @Override
    public void releaseAnyConnection(Connection connection) throws SQLException {
        connection.close();
    }
    @Override
    public Connection getConnection(String iy) throws SQLException {
        String tenantIdentifier = TenantContext.getCurrentTenant();
        final Connection connection = getAnyConnection();
        try {
            if (tenantIdentifier == null) {
            	tenantIdentifier = SchemaConfiguration.DEFAULT_SCHEMA;
            }
            connection.createStatement().execute(String.format("USE %s", tenantIdentifier));
        }
        catch ( SQLException e ) {
        	throw new HibernateException(
                    "Problem setting schema to " + tenantIdentifier,
                    e
            );
        }
        return connection;
    }
    @Override
    public void releaseConnection(String tenantIdentifier, Connection connection) throws SQLException {
        connection.close();
    }
    @SuppressWarnings("rawtypes")
    @Override
    public boolean isUnwrappableAs(Class unwrapType) {
        return false;
    }
    @Override
    public <T> T unwrap(Class<T> unwrapType) {
        return null;
    }
    @Override
    public boolean supportsAggressiveRelease() {
        return true;
    }
}