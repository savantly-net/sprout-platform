package net.savantly.sprout.core.tenancy;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter @Setter
@Embeddable
public class TenantedPrimaryKey implements Serializable {

	private static final long serialVersionUID = 1L;

	@Column(name = "item_id", columnDefinition = "VARCHAR(42)")
    protected String itemId;
	
	@Column(name = "TENANT_ID")
	private String tenantId;
}
