package net.savantly.sprout.core.domain.versioning;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;
import javax.persistence.PrePersist;

import org.hibernate.annotations.Filter;
import org.hibernate.annotations.FilterDef;
import org.hibernate.annotations.ParamDef;

import net.savantly.sprout.core.tenancy.TenantContext;

@FilterDef(name = "tenantFilter", parameters = {@ParamDef(name = "tenantId", type = "string")})
@Filter(name = "tenantFilter", condition = "tenant_id = :tenantId")
@MappedSuperclass
public abstract class TenantedVersionedDomainObject extends VersionedDomainObject {

	@Column(name = "TENANT_ID")
	private String tenantId;
	public String getTenantId() {
		return this.tenantId;
	}
	public void setTenantId(String tenantId) {
		this.tenantId = tenantId;
	}
	
	@PrePersist
	public void prePersist() {
		this.setTenantId(TenantContext.getCurrentTenant());
	}
}
