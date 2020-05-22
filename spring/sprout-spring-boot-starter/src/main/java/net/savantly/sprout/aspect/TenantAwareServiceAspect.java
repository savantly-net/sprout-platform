package net.savantly.sprout.aspect;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.hibernate.Session;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import net.savantly.sprout.tenancy.TenantAwareService;
import net.savantly.sprout.tenancy.TenantContext;

@Aspect
@Component
public class TenantAwareServiceAspect {

  private final Logger log = LoggerFactory.getLogger(this.getClass());

  // only applicable to TenantAwareService
  @Before("execution(* net.savantly.sprout.tenancy.TenantAwareService.*(..))")
  public void aroundExecution(JoinPoint pjp, TenantAwareService service) throws Throwable {
    org.hibernate.Filter filter = service.getEntityManager().unwrap(Session.class).enableFilter("tenantFilter");
    filter.setParameter("tenantId", TenantContext.getCurrentTenant());
    filter.validate();
  }
}