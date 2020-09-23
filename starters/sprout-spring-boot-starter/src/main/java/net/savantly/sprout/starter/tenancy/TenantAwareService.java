package net.savantly.sprout.starter.tenancy;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

public abstract class TenantAwareService {
	
	@PersistenceContext
	private EntityManager entityManager;

	public TenantAwareService(EntityManager entityManager) {
		this.entityManager = entityManager;
	}
	
	public EntityManager getEntityManager() {
		return this.entityManager;
	}
}
