package net.savantly.sprout.starter.versioning;

import java.io.Serializable;

import javax.persistence.EntityNotFoundException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.rest.webmvc.spi.BackendIdConverter;

import net.savantly.sprout.core.domain.versioning.StringVersionedId;
import net.savantly.sprout.core.domain.versioning.VersionedDomainObject;

public class VersionedObjectBackendIdConverter implements BackendIdConverter {
	
	private final static Logger log = LoggerFactory.getLogger(VersionedObjectBackendIdConverter.class);


	@Override
	public boolean supports(Class<?> delimiter) {
		return VersionedDomainObject.class.isAssignableFrom(delimiter);
	}

	@Override
	public Serializable fromRequestId(String id, Class<?> entityType) {
		String[] parts = id.split("_");
		if (parts.length != 2) {
			log.error("problem parsing entity id", id);
			throw new EntityNotFoundException("with id: " + id);
		}
		Long _version = Long.parseLong(parts[1]);
		return new StringVersionedId().setId(parts[0]).setVersion(_version);
	}

	@Override
	public String toRequestId(Serializable id, Class<?> entityType) {
		StringVersionedId versionedId = (StringVersionedId)id;
		return String.format("%s_%s", versionedId.getId(), versionedId.getVersion());
	}

}
