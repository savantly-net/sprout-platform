package net.savantly.sprout.module.forms.domain.definition;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import org.hibernate.annotations.Type;

import com.fasterxml.jackson.annotation.JsonRawValue;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;
import net.savantly.sprout.core.tenancy.TenantKeyedEntity;

@Entity
@Getter @Setter
@Accessors(chain = true)
@Table(
	name = "SF_FORM_DEFINITION",
	uniqueConstraints = {
		@UniqueConstraint(columnNames = {"TENANT_ID", "FORM_PATH"})
	}
)
public class FormDefinition extends TenantKeyedEntity {

	@Enumerated(EnumType.STRING)
	@Column(name = "display")
	private FormDisplayType display;

	@Column(name = "title")
	private String title;
	
	@Column(name = "name")
	private String name;
	
	@Column(name = "FORM_PATH")
	private String path;

	@Enumerated(EnumType.STRING)
	@Column(name = "FORMTYPE")
	private FormType formType;
	
	@ElementCollection()
	@Column(name="tags")
	private List<String> tags = new ArrayList<>();
	
	@Column(name="components", columnDefinition = "jsonb")
	@Type(type = "jsonb")
	@JsonRawValue
	private String components;

	@Column(name="settings", columnDefinition = "jsonb")
	@Type(type = "jsonb")
	@JsonRawValue
	private String settings;
}
