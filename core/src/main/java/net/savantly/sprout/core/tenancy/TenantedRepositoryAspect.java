package net.savantly.sprout.core.tenancy;

import java.util.Objects;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.hibernate.Session;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.jpa.EntityManagerFactoryUtils;

@Aspect
public class TenantedRepositoryAspect {

	private final Logger log = LoggerFactory.getLogger(this.getClass());

	@Autowired
	private EntityManagerFactory entityManagerFactory;

	/** Intercept all the calls to a TenantedJpaRepository
	 * 
	 * @param pjp
	 * @throws Throwable
	 */
	@Before("execution(* net.savantly.sprout.core.tenancy.TenantedJpaRepository+.*(..))")
	public void beforeExecution(JoinPoint pjp) throws Throwable {

		EntityManager entityManager = EntityManagerFactoryUtils.getTransactionalEntityManager(entityManagerFactory);
		if (Objects.isNull(entityManager)) {
			if(log.isDebugEnabled()) {
				log.debug("no transactional entity manager available. creating new entity manager from factory");
			}
			entityManager = this.entityManagerFactory.createEntityManager();
		}
		
		if(log.isDebugEnabled()) {
			log.debug("enabling tenantFilter with parameter: " + TenantContext.getCurrentTenant());
		}
		
		org.hibernate.Filter filter = entityManager.unwrap(Session.class).enableFilter("tenantFilter");
		filter.setParameter("tenantId", TenantContext.getCurrentTenant());
		filter.validate();
	}

}