package net.savantly.sprout.core.domain;

import java.io.Serializable;

import org.hibernate.HibernateException;
import org.hibernate.engine.spi.SessionImplementor;
import org.hibernate.id.UUIDGenerator;

public class UseExistingOrGenerateIdGenerator extends UUIDGenerator {
    @Override
    public Serializable generate(SessionImplementor session, Object object)
                        throws HibernateException {
        Serializable id = session.getEntityPersister(null, object)
                      .getClassMetadata().getIdentifier(object, session);
        return id != null ? id : super.generate(session, object);
    }
}