package net.savantly.sprout.core.tenancy;

import java.util.Arrays;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.hibernate.Session;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import net.savantly.sprout.core.domain.tenant.TenantSupport;

@Aspect
public class TenantedRepositoryAspect {

	private final Logger log = LoggerFactory.getLogger(this.getClass());

	@PersistenceContext
	private EntityManager entityManager;

	/** Intercept all the calls to a TenantedJpaRepository
	 * 
	 * @param pjp
	 * @throws Throwable
	 */
	@Before("execution(* net.savantly.sprout.core.tenancy.TenantedJpaRepository+.*(..))")
	public void beforeExecution(JoinPoint pjp) throws Throwable {
		updateTenantSupportedArguments(pjp);
		org.hibernate.Filter filter = entityManager.unwrap(Session.class).enableFilter("tenantFilter");
		filter.setParameter("tenantId", TenantContext.getCurrentTenant());
		filter.validate();
	}

	/**
	 * Check each argument to the method, and set the tenantId if it's supported
	 * @param pjp
	 */
	private void updateTenantSupportedArguments(JoinPoint pjp) {
		Arrays.stream(pjp.getArgs()).forEach(a -> {
			if (TenantSupport.class.isAssignableFrom(a.getClass())) {
				((TenantSupport)a).setTenantId(TenantContext.getCurrentTenant());
			}
		});
	}
}