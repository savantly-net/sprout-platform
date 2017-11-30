package net.savantly.sprout.core.domain;

import java.io.Serializable;

import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;
import javax.persistence.Transient;

import org.hibernate.annotations.Type;
import org.joda.time.DateTime;
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
	private DateTime createdDate = DateTime.now();
	private String createdBy;
	private DateTime lastModifiedDate;
	private String lastModifiedBy;

	@CreatedBy
	@JsonIgnore(false)
	public String getCreatedBy() {
		return createdBy;
	}

	@CreatedDate
	@JsonIgnore(false)
	@Type(type="org.jadira.usertype.dateandtime.joda.PersistentDateTime")
	public DateTime getCreatedDate() {
		return createdDate;
	}

	@LastModifiedBy
	@JsonIgnore(false)
	public String getLastModifiedBy() {
		return lastModifiedBy;
	}

	@LastModifiedDate
	@JsonIgnore(false)
	@Type(type="org.jadira.usertype.dateandtime.joda.PersistentDateTime")
	public DateTime getLastModifiedDate() {
		return lastModifiedDate;
	}

	@Transient
	public boolean isNew() {
		return (createdDate == null || createdBy == null);
	}

	// @JsonIgnore(true)
	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}

	// @JsonIgnore(true)
	public void setCreatedDate(DateTime createdDate) {
		this.createdDate = createdDate;
	}

	// @JsonIgnore(true)
	public void setLastModifiedBy(String lastModifiedBy) {
		this.lastModifiedBy = lastModifiedBy;
	}

	// @JsonIgnore(true)
	public void setLastModifiedDate(DateTime lastModifiedDate) {
		this.lastModifiedDate = lastModifiedDate;
	}
}
