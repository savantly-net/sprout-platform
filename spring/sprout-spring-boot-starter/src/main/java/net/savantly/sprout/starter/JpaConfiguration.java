package net.savantly.sprout.starter;

import java.util.HashMap;
import java.util.Map;

import javax.persistence.EntityManagerFactory;
import javax.sql.DataSource;

import org.hibernate.MultiTenancyStrategy;
import org.hibernate.cfg.Environment;
import org.hibernate.context.spi.CurrentTenantIdentifierResolver;
import org.hibernate.engine.jdbc.connections.spi.MultiTenantConnectionProvider;
import org.springframework.beans.factory.FactoryBean;
import org.springframework.beans.factory.SmartFactoryBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.jdbc.DataSourceProperties;
import org.springframework.boot.autoconfigure.orm.jpa.JpaProperties;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.JpaVendorAdapter;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;

import net.savantly.sprout.tenancy.MultiTenantConnectionProviderImpl;
import net.savantly.sprout.tenancy.TenantIdentifierResolver;

@Configuration
@EnableJpaRepositories(basePackages="net.savantly.sprout.**")
public class JpaConfiguration  {	
	
	@Autowired
	private DataSourceProperties dataSourceProperties;
    @Autowired
    private JpaProperties jpaProperties;  
    
    public JpaConfiguration() {
    	System.setProperty("spring.jpa.hibernate.ddl-auto", "none");
    	//System.setProperty("spring.jpa.hibernate.naming.physical-strategy", SchemaConfiguration.NAMING_STRATEGY);
	}
    
	@Bean
	public CurrentTenantIdentifierResolver tenantIdentifierResolver() {
		return new TenantIdentifierResolver();
	}
	
	@Bean
	public DataSource dataSource() {
		return dataSourceProperties.initializeDataSourceBuilder().build();
	}
	
    
    @Bean
    public MultiTenantConnectionProvider multiTenantConnectionProvider(DataSource ds) {
    	return new MultiTenantConnectionProviderImpl(ds);
    }
    
    @Bean
    public JpaVendorAdapter jpaVendorAdapter() {
        return new HibernateJpaVendorAdapter();
    }
    
    @Bean
    public LocalContainerEntityManagerFactoryBean entityManagerFactory(DataSource dataSource,
                                                                       MultiTenantConnectionProvider multiTenantConnectionProviderImpl,
                                                                       CurrentTenantIdentifierResolver currentTenantIdentifierResolverImpl) {
        Map<String, Object> properties = new HashMap<>();
        properties.putAll(jpaProperties.getHibernateProperties(dataSource));
        properties.put(Environment.MULTI_TENANT, MultiTenancyStrategy.SCHEMA);
        properties.put(Environment.MULTI_TENANT_CONNECTION_PROVIDER, multiTenantConnectionProviderImpl);
        properties.put(Environment.MULTI_TENANT_IDENTIFIER_RESOLVER, currentTenantIdentifierResolverImpl);
        LocalContainerEntityManagerFactoryBean em = new LocalContainerEntityManagerFactoryBean();
        em.setDataSource(dataSource);
        em.setPackagesToScan("net.savantly.sprout.**");
        em.setJpaVendorAdapter(jpaVendorAdapter());
        em.setJpaPropertyMap(properties);
        return em;
    }
    
    @Bean
    public PlatformTransactionManager transactionManager(EntityManagerFactory ef) {
        JpaTransactionManager transactionManager = new JpaTransactionManager();
        transactionManager.setEntityManagerFactory(ef);
        return transactionManager;
    }
    
    @Bean
	public SchemaConfiguration schemaConfiguration(DataSource ds) {
		SchemaConfiguration schemaConfiguration = new SchemaConfiguration();
		return schemaConfiguration;
	}
    
    @Bean
    public FactoryBean<SproutFixtures> sproutFixturesFactory(ApplicationContext applicationContext) {
    	return new SmartFactoryBean<SproutFixtures>() {
			
			@Override
			public boolean isSingleton() {
				return false;
			}
			
			@Override
			public Class<?> getObjectType() {
				return SproutFixtures.class;
			}
			
			@Override
			public SproutFixtures getObject() throws Exception {
				return new SproutFixtures(applicationContext);
			}

			@Override
			public boolean isPrototype() {
				return true;
			}

			@Override
			public boolean isEagerInit() {
				return false;
			}
		};
    }

}
