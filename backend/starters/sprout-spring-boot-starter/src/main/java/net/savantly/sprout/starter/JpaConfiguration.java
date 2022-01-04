package net.savantly.sprout.starter;

import java.io.Serializable;
import java.time.OffsetDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import javax.sql.DataSource;

import org.hibernate.EmptyInterceptor;
import org.hibernate.type.Type;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.autoconfigure.AutoConfigureAfter;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration;
import org.springframework.boot.autoconfigure.orm.jpa.JpaProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
import org.springframework.context.annotation.AdviceMode;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.data.auditing.DateTimeProvider;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import com.opentable.db.postgres.embedded.EmbeddedPostgres;

import lombok.AllArgsConstructor;
import net.savantly.sprout.autoconfigure.properties.SproutConfigurationProperties;
import net.savantly.sprout.core.security.audit.SproutAuditorAware;
import net.savantly.sprout.starter.migration.CoreDBMigrationConfiguration;

@Configuration("sproutJpaConfiguration")
@AutoConfigureAfter(HibernateJpaAutoConfiguration.class)
@EnableConfigurationProperties({JpaProperties.class})
@EnableJpaRepositories(basePackages = {"net.savantly.sprout.core", "net.savantly.sprout.domain"})
@EnableJpaAuditing(dateTimeProviderRef = "auditingDateTimeProvider")
@EntityScan
@EnableTransactionManagement(mode = AdviceMode.ASPECTJ)
@AllArgsConstructor
@Import(CoreDBMigrationConfiguration.class)
public class JpaConfiguration {

	public static final String ENTITY_MANAGER_FACTORY_BEAN = "sproutEntityManagerFactory";

	private final String basePackagesToScan = "net.savantly.sprout.**";

	private final Logger log = LoggerFactory.getLogger(JpaConfiguration.class);
	private final SproutConfigurationProperties sproutProperties;
	{
		// System.setProperty("spring.jpa.hibernate.ddl-auto", "create-drop");
		// System.setProperty("spring.jpa.hibernate.naming.physical-strategy",
		// SchemaConfiguration.NAMING_STRATEGY);
	}

	@Bean
	@ConditionalOnMissingBean
	@ConditionalOnProperty(name = "sprout.jpa.use-embedded-db")
	public DataSource embeddedDataSource() throws Exception {
        DataSource embeddedPostgresDS = EmbeddedPostgres.builder()
                .start().getPostgresDatabase();
        return embeddedPostgresDS;
    }

	@ConditionalOnMissingBean(name = "entityManagerFactory")
	@Bean(name = {ENTITY_MANAGER_FACTORY_BEAN, "entityManagerFactory"})
	public LocalContainerEntityManagerFactoryBean entityManagerFactory(EntityManagerFactoryBuilder factory,
			DataSource dataSource, JpaProperties properties) {
		log.info(String.format("Creating LocalContainerEntityManagerFactoryBean with properties: %s", properties));
		properties.setShowSql(true);
		Map<String, Object> jpaProperties = new HashMap<>(properties.getProperties());
		//jpaProperties.put("hibernate.session_factory.interceptor", hibernateInterceptor());
		//jpaProperties.put("hibernate.ddl-auto", "create-drop");
		if (!sproutProperties.getJpa().getPackagesToScan().contains(basePackagesToScan)) {
			sproutProperties.getJpa().getPackagesToScan().add(basePackagesToScan);
		}
		String[] packagesToScan = sproutProperties.getJpa().getPackagesToScan().toArray(new String[sproutProperties.getJpa().getPackagesToScan().size()]);
		return factory.dataSource(dataSource).packages(packagesToScan).properties(jpaProperties).build();
	}


	@Bean(name = "auditingDateTimeProvider")
	public DateTimeProvider auditingDateTimeProvider() {
		return () -> Optional.of(OffsetDateTime.now());
	}

	@Bean
	public SproutAuditorAware sproutAuditorAware() {
		return new SproutAuditorAware();
	}

	public EmptyInterceptor hibernateInterceptor() {
		return new EmptyInterceptor() {

			@Override
			public boolean onSave(Object entity, Serializable id, Object[] state, String[] propertyNames,
					Type[] types) {
				/*if (entity instanceof TenantSupport) {
					final String tenantId = TenantContext.getCurrentTenant();
					log.debug("[save] Updating the entity " + id + " with tenant information: " + tenantId);
					((TenantSupport) entity).setTenantId(TenantContext.getCurrentTenant());
				}*/
				return false;
			}

			@Override
			public void onDelete(Object entity, Serializable id, Object[] state, String[] propertyNames, Type[] types) {
				/*if (entity instanceof TenantSupport) {
					final String tenantId = TenantContext.getCurrentTenant();
					log.debug("[delete] Updating the entity " + id + " with tenant information: " + tenantId);
					((TenantSupport) entity).setTenantId(tenantId);
				}*/
			}

			@Override
			public boolean onFlushDirty(Object entity, Serializable id, Object[] currentState, Object[] previousState,
					String[] propertyNames, Type[] types) {
			/*	if (entity instanceof TenantSupport) {
					final String tenantId = TenantContext.getCurrentTenant();
					log.debug("[flush-dirty] Updating the entity " + id + " with tenant information: " + tenantId);
					((TenantSupport) entity).setTenantId(tenantId);
				}*/
				return false;
			}

		};
	}

}
