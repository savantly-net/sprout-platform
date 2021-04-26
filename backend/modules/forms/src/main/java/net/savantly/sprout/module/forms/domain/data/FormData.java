package net.savantly.sprout.module.forms.domain.data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import org.hibernate.annotations.Type;

import com.fasterxml.jackson.annotation.JsonRawValue;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;
import net.savantly.sprout.core.tenancy.TenantKeyedEntity;

@Entity(name="SF_FORM_DATA")
@Table(name="SF_FORM_DATA")
@Getter @Setter
@Accessors(chain = true)
public class FormData extends TenantKeyedEntity {

	private String formDefinitionId;

	@Column(name="data", columnDefinition = "jsonb")
	@Type(type = "jsonb")
	@JsonRawValue
	private String data;

	@Column(name="metadata", columnDefinition = "jsonb")
	@Type(type = "jsonb")
	@JsonRawValue
	private String metadata;
}
