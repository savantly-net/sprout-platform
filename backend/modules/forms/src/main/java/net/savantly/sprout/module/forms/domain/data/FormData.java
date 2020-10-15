package net.savantly.sprout.module.forms.domain.data;

import javax.persistence.Entity;

import org.hibernate.annotations.Type;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;
import net.savantly.sprout.core.tenancy.TenantKeyedEntity;

@Entity
@Getter @Setter
@Accessors(chain = true)
public class FormData extends TenantKeyedEntity {

	private String formDefinitionId;

	@Type(type = "jsonb")
	private String data;
}
