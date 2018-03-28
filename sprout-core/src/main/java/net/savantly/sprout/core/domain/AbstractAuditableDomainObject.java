package net.savantly.sprout.core.domain;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Optional;

import javax.persistence.Convert;
import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;
import javax.persistence.Transient;

import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.fasterxml.jackson.annotation.JsonIgnore;

import net.savantly.sprout.core.configuration.SproutConfiguration;
import net.savantly.sprout.core.security.SproutAuditable;

@MappedSuperclass
@EntityListeners({ AuditingEntityListener.class })
public abstract class AbstractAuditableDomainObject<ID extends Serializable> implements SproutAuditable<ID> {

	private static final long serialVersionUID = SproutConfiguration.serialVersionUID;

	// Auditing Metadata
	private LocalDateTime createdDate = LocalDateTime.now();
	private String createdBy = "";
	private LocalDateTime lastModifiedDate = LocalDateTime.now();
	private String lastModifiedBy = "";

	@CreatedBy
	@JsonIgnore(false)
	@Convert(converter=OptionalStringAttributeConverter.class)
	public Optional<String> getCreatedBy() {
		return Optional.of(createdBy);
	}

	@CreatedDate
	@JsonIgnore(false)
	@Convert(converter=OptionalLocalDateTimeAttributeConverter.class)
	public Optional<LocalDateTime> getCreatedDate() {
		return Optional.of(createdDate);
	}

	@LastModifiedBy
	@JsonIgnore(false)
	@Convert(converter=OptionalStringAttributeConverter.class)
	public Optional<String> getLastModifiedBy() {
		return Optional.of(lastModifiedBy);
	}

	@LastModifiedDate
	@JsonIgnore(false)
	@Convert(converter=OptionalLocalDateTimeAttributeConverter.class)
	public Optional<LocalDateTime> getLastModifiedDate() {
		return Optional.of(lastModifiedDate);
	}

	@Transient
	public boolean isNew() {
		return (createdDate == null || createdBy == null);
	}

	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}
	@JsonIgnore
	public void setCreatedBy(Optional<String> createdBy) {
		this.createdBy = createdBy.get();
	}

	public void setCreatedDate(LocalDateTime createdDate) {
		this.createdDate = createdDate;
	}
	@JsonIgnore
	public void setCreatedDate(Optional<LocalDateTime> createdDate) {
		this.createdDate = createdDate.get();
	}

	public void setLastModifiedBy(String lastModifiedBy) {
		this.lastModifiedBy = lastModifiedBy;
	}
	@JsonIgnore
	public void setLastModifiedBy(Optional<String> lastModifiedBy) {
		this.lastModifiedBy = lastModifiedBy.get();
	}

	public void setLastModifiedDate(LocalDateTime lastModifiedDate) {
		this.lastModifiedDate = lastModifiedDate;
	}
	@JsonIgnore
	public void setLastModifiedDate(Optional<LocalDateTime> lastModifiedDate) {
		this.lastModifiedDate = lastModifiedDate.get();
	}
}
