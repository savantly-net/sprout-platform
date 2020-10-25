package net.savantly.sprout.core.domain;

import java.io.Serializable;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.util.Objects;
import java.util.Optional;

import javax.persistence.EntityListeners;
import javax.persistence.ManyToOne;
import javax.persistence.MappedSuperclass;
import javax.persistence.Transient;

import org.hibernate.annotations.TypeDef;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.lang.Nullable;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import net.savantly.sprout.core.configuration.SproutConfiguration;
import net.savantly.sprout.core.domain.user.SproutUser;
import net.savantly.sprout.core.domain.user.SproutUserEntity;
import net.savantly.sprout.core.security.SproutAuditable;

@MappedSuperclass
@EntityListeners({ AuditingEntityListener.class })
@TypeDef(name = "sproutUser", defaultForType = SproutUser.class, typeClass = SproutUserEntity.class)
public abstract class AbstractAuditableDomainObject<ID extends Serializable> implements SproutAuditable<ID> {

	private static final long serialVersionUID = SproutConfiguration.serialVersionUID;

	@JsonDeserialize(as = SproutUserEntity.class)
	@ManyToOne(targetEntity = SproutUserEntity.class)
	private @Nullable SproutUser createdBy;

	private @Nullable ZonedDateTime createdDate;

	@JsonDeserialize(as = SproutUserEntity.class)
	@ManyToOne(targetEntity = SproutUserEntity.class)
	private @Nullable SproutUser lastModifiedBy;

	private @Nullable ZonedDateTime lastModifiedDate;

	@Override
	public Optional<SproutUser> getCreatedBy() {
		return Optional.ofNullable(createdBy);
	}

	@Override
	public void setCreatedBy(SproutUser createdBy) {
		this.createdBy = createdBy;
	}

	@Override
	public Optional<ZonedDateTime> getCreatedDate() {
		return Optional.ofNullable(createdDate);
	}

	@Override
	@JsonProperty(access = Access.READ_ONLY)
	public void setCreatedDate(ZonedDateTime createdDate) {
		if(Objects.nonNull(createdDate)) {
			this.createdDate = createdDate;
		} else {
			this.createdDate = ZonedDateTime.from(Instant.now());
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