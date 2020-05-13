package net.savantly.sprout.core.domain;

import java.io.Serializable;

import org.hibernate.HibernateException;
import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.id.UUIDGenerator;

public class UseExistingOrGenerateIdGenerator extends UUIDGenerator {
	
	@Override
	public Serializable generate(SharedSessionContractImplementor session, Object object) throws HibernateException {
		Serializable id = session.getEntityPersister(null, object)
                 .getClassMetadata().getIdentifier(object, session);
		if (id == null || id == "") {
			return super.generate(session, object);
		} else {
			return id;
		}
	}
}
