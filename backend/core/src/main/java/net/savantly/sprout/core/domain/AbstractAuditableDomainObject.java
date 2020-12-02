package net.savantly.sprout.core.domain;

import java.io.Serializable;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.util.Objects;
import java.util.Optional;

import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;
import javax.persistence.Transient;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.lang.Nullable;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import net.savantly.sprout.core.configuration.SproutConfiguration;
import net.savantly.sprout.core.security.audit.SproutAuditable;

@MappedSuperclass
@EntityListeners({ AuditingEntityListener.class })
public abstract class AbstractAuditableDomainObject<ID extends Serializable> implements SproutAuditable<ID> {

	private static final long serialVersionUID = SproutConfiguration.serialVersionUID;

	@JsonProperty(access = Access.READ_ONLY)
	private @Nullable String createdBy;
	@JsonProperty(access = Access.READ_ONLY)
	private @Nullable ZonedDateTime createdDate;
	@JsonProperty(access = Access.READ_ONLY)
	private @Nullable String lastModifiedBy;
	@JsonProperty(access = Access.READ_ONLY)
	private @Nullable ZonedDateTime lastModifiedDate;

	@Override
	public Optional<String> getCreatedBy() {
		return Optional.ofNullable(createdBy);
	}

	@Override
	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}

	@Override
	public Optional<ZonedDateTime> getCreatedDate() {
		return Optional.ofNullable(createdDate);
	}

	@Override
	public void setCreatedDate(ZonedDateTime createdDate) {
		if(Objects.nonNull(createdDate)) {
			this.createdDate = createdDate;
		} else {
			this.createdDate = ZonedDateTime.from(Instant.now());
		}
		
	}

	@Override
	public Optional<String> getLastModifiedBy() {
		return Optional.ofNullable(lastModifiedBy);
	}

	@Override
	public void setLastModifiedBy(String lastModifiedBy) {
		this.lastModifiedBy = lastModifiedBy;
	}

	@Override
	public Optional<ZonedDateTime> getLastModifiedDate() {
		return Optional.ofNullable(lastModifiedDate);
	}

	@Override
	public void setLastModifiedDate(ZonedDateTime lastModifiedDate) {
		if(Objects.nonNull(lastModifiedDate)) {
			this.lastModifiedDate = lastModifiedDate;
		} else {
			this.lastModifiedDate = ZonedDateTime.from(Instant.now());
		}
	}

	@Transient
	public boolean isNew() {
		return (createdDate == null || createdBy == null);
	}
}