package net.savantly.sprout.starter;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

import javax.sql.DataSource;

import org.hibernate.EmptyInterceptor;
import org.hibernate.type.Type;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.FactoryBean;
import org.springframework.beans.factory.SmartFactoryBean;
import org.springframework.boot.autoconfigure.AutoConfigureAfter;
import org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration;
import org.springframework.boot.autoconfigure.orm.jpa.JpaProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;

import lombok.AllArgsConstructor;
import net.savantly.sprout.autoconfigure.properties.SproutConfigurationProperties;
import net.savantly.sprout.core.domain.tenant.TenantSupport;
import net.savantly.sprout.core.tenancy.TenantContext;

@Configuration("sproutJpaConfiguration")
@AutoConfigureAfter(HibernateJpaAutoConfiguration.class)
@EnableConfigurationProperties({JpaProperties.class})
@EnableJpaRepositories(basePackages = {"net.savantly.sprout.core", "net.savantly.sprout.settings"})
@AllArgsConstructor
public class JpaConfiguration {
	
	private final String basePackagesToScan = "net.savantly.sprout.**";

	private final Logger log = LoggerFactory.getLogger(JpaConfiguration.class);
	private final SproutConfigurationProperties sproutProperties;
	{
		// System.setProperty("spring.jpa.hibernate.ddl-auto", "create-drop");
		// System.setProperty("spring.jpa.hibernate.naming.physical-strategy",
		// SchemaConfiguration.NAMING_STRATEGY);
	}

	@Bean
	public LocalContainerEntityManagerFactoryBean entityManagerFactory(EntityManagerFactoryBuilder factory,
			DataSource dataSource, JpaProperties properties) {
		log.info(String.format("Creating LocalContainerEntityManagerFactoryBean with properties: %s", properties));
		properties.setShowSql(true);
		Map<String, Object> jpaProperties = new HashMap<>(properties.getProperties());
		jpaProperties.put("hibernate.session_factory.interceptor", hibernateInterceptor());
		//jpaProperties.put("hibernate.ddl-auto", "create-drop");
		if (!sproutProperties.getJpa().getPackagesToScan().contains(basePackagesToScan)) {
			sproutProperties.getJpa().getPackagesToScan().add(basePackagesToScan);
		}
		String[] packagesToScan = sproutProperties.getJpa().getPackagesToScan().toArray(new String[sproutProperties.getJpa().getPackagesToScan().size()]);
		return factory.dataSource(dataSource).packages(packagesToScan).properties(jpaProperties).build();
	}

	@Bean
	public EmptyInterceptor hibernateInterceptor() {
		return new EmptyInterceptor() {
			
			

			@Override
			public boolean onSave(Object entity, Serializable id, Object[] state, String[] propertyNames,
					Type[] types) {
				if (entity instanceof TenantSupport) {
					final String tenantId = TenantContext.getCurrentTenant();
					log.debug("[save] Updating the entity " + id + " with tenant information: " + tenantId);
					((TenantSupport) entity).setTenantId(TenantContext.getCurrentTenant());
				}
				return false;
			}

			@Override
			public void onDelete(Object entity, Serializable id, Object[] state, String[] propertyNames, Type[] types) {
				if (entity instanceof TenantSupport) {
					final String tenantId = TenantContext.getCurrentTenant();
					log.debug("[delete] Updating the entity " + id + " with tenant information: " + tenantId);
					((TenantSupport) entity).setTenantId(tenantId);
				}
			}

			@Override
			public boolean onFlushDirty(Object entity, Serializable id, Object[] currentState, Object[] previousState,
					String[] propertyNames, Type[] types) {
				if (entity instanceof TenantSupport) {
					final String tenantId = TenantContext.getCurrentTenant();
					log.debug("[flush-dirty] Updating the entity " + id + " with tenant information: " + tenantId);
					((TenantSupport) entity).setTenantId(tenantId);
				}
				return false;
			}

		};
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
