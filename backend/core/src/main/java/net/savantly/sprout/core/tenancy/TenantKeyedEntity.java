package net.savantly.sprout.core.tenancy;

import java.util.Objects;
import java.util.UUID;

import javax.persistence.Id;
import javax.persistence.MappedSuperclass;
import javax.persistence.PrePersist;
import javax.persistence.Transient;
import javax.persistence.Version;

import org.hibernate.annotations.Filter;
import org.hibernate.annotations.FilterDef;
import org.hibernate.annotations.ParamDef;
import org.springframework.data.domain.Persistable;
import org.springframework.util.ClassUtils;

import lombok.Getter;
import lombok.Setter;
import net.savantly.sprout.core.domain.AbstractAuditableDomainObject;
import net.savantly.sprout.core.domain.tenant.TenantSupport;

@FilterDef(name = "tenantFilter", parameters = { @ParamDef(name = "tenantId", type = "string") })
@Filter(name = "tenantFilter", condition = "tenant_id = :tenantId")
@MappedSuperclass
@Getter
public class TenantKeyedEntity extends AbstractAuditableDomainObject<TenantedPrimaryKey> implements Persistable<TenantedPrimaryKey>, TenantSupport {

	@Id
	@Setter
	private TenantedPrimaryKey id;

	@Version
	private Long version;

	@PrePersist
	public void prePersist_primaryKey() {
		if(Objects.isNull(this.id)) {
			this.setId(new TenantedPrimaryKey());
		}
		if(Objects.isNull(this.getId().getItemId())) {
			this.getId().setItemId(UUID.randomUUID().toString());
		}
		this.getId().setTenantId(TenantContext.getCurrentTenant());
	}
	
	public String getTenantId() {
		if(Objects.nonNull(id)) {
			return id.getTenantId();
		} else {
			return null;
		}
	}
	
	public void setTenantId(String tenantId) {
		if(Objects.nonNull(id)) {
			this.getId().setTenantId(tenantId);
		}
	}

	/**
	 * Must be {@link Transient} in order to ensure that no JPA provider complains
	 * because of a missing setter.
	 * 
	 * @see org.springframework.data.domain.Persistable#isNew()
	 */
	@Transient
	public boolean isNew() {
		return null == getId();
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return String.format("Entity of type %s with id: %s", this.getClass().getName(), getId());
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see java.lang.Object#equals(java.lang.Object)
	 */
	@Override
	public boolean equals(Object obj) {

		if (null == obj) {
			return false;
		}

		if (this == obj) {
			return true;
		}

		if (!getClass().equals(ClassUtils.getUserClass(obj))) {
			return false;
		}

		Persistable<?> that = (Persistable<?>) obj;

		return null == this.getId() ? false : this.getId().equals(that.getId());
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see java.lang.Object#hashCode()
	 */
	@Override
	public int hashCode() {

		int hashCode = 17;

		hashCode += null == getId() ? 0 : getId().hashCode() * 31;

		return hashCode;
	}

}
