package net.savantly.sprout.module.forms.domain.definition;

import javax.persistence.Entity;

import org.hibernate.annotations.Type;

import com.fasterxml.jackson.annotation.JsonRawValue;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;
import net.savantly.sprout.core.tenancy.TenantKeyedEntity;

@Entity
@Getter @Setter
@Accessors(chain = true)
public class FormDefinition extends TenantKeyedEntity {

	private String title;
	
	@Type(type = "jsonb")
	@JsonRawValue
	private String components;
}
