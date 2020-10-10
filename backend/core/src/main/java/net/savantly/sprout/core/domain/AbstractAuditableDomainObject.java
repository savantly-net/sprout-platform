package net.savantly.sprout.core.domain;

import java.io.Serializable;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.Objects;
import java.util.Optional;

import javax.persistence.EntityListeners;
import javax.persistence.ManyToOne;
import javax.persistence.MappedSuperclass;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.hibernate.annotations.TypeDef;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.lang.Nullable;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import net.savantly.sprout.core.configuration.SproutConfiguration;
import net.savantly.sprout.core.domain.user.SproutUser;
import net.savantly.sprout.core.domain.user.SproutUserEntity;
import net.savantly.sprout.core.security.SproutAuditable;

@MappedSuperclass
@EntityListeners({ AuditingEntityListener.class })
@TypeDef(name = "sproutUser", defaultForType = SproutUser.class, typeClass = SproutUserEntity.class)
public abstract class AbstractAuditableDomainObject<ID extends Serializable> implements SproutAuditable<ID> {

	private static final long serialVersionUID = SproutConfiguration.serialVersionUID;

	@ManyToOne(targetEntity = SproutUserEntity.class)
	private @Nullable SproutUser createdBy;

	@Temporal(TemporalType.TIMESTAMP) //
	private @Nullable Date createdDate;

	@ManyToOne(targetEntity = SproutUserEntity.class)
	private @Nullable SproutUser lastModifiedBy;

	@Temporal(TemporalType.TIMESTAMP) //
	private @Nullable Date lastModifiedDate;

	@Override
	public Optional<SproutUser> getCreatedBy() {
		return Optional.ofNullable(createdBy);
	}

	@Override
	public void setCreatedBy(SproutUser createdBy) {
		this.createdBy = createdBy;
	}

	@Override
	public Optional<LocalDateTime> getCreatedDate() {
		return null == createdDate ? Optional.empty()
				: Optional.of(LocalDateTime.ofInstant(createdDate.toInstant(), ZoneId.systemDefault()));
	}

	@Override
	@JsonProperty(access = Access.READ_ONLY)
	public void setCreatedDate(LocalDateTime createdDate) {
		if(Objects.nonNull(createdDate)) {
			this.createdDate = Date.from(createdDate.atZone(ZoneId.systemDefault()).toInstant());
		} else {
			this.createdDate = Date.from(Instant.now());
		}
		
	}

	@Override
	public Optional<SproutUser> getLastModifiedBy() {
		return Optional.ofNullable(lastModifiedBy);
	}

	@Override
	public void setLastModifiedBy(SproutUser lastModifiedBy) {
		this.lastModifiedBy = lastModifiedBy;
	}

	@Override
	public Optional<LocalDateTime> getLastModifiedDate() {
		return null == lastModifiedDate ? Optional.empty()
				: Optional.of(LocalDateTime.ofInstant(lastModifiedDate.toInstant(), ZoneId.systemDefault()));
	}

	@Override
	public void setLastModifiedDate(LocalDateTime lastModifiedDate) {
		if(Objects.nonNull(lastModifiedDate)) {
			this.lastModifiedDate = Date.from(lastModifiedDate.atZone(ZoneId.systemDefault()).toInstant());
		} else {
			this.lastModifiedDate = Date.from(Instant.now());
		}
	}

	@Transient
	public boolean isNew() {
		return (createdDate == null || createdBy == null);
	}
}