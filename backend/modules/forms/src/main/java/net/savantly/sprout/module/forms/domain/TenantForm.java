package net.savantly.sprout.module.forms.domain;

import javax.persistence.Entity;

import lombok.Getter;
import lombok.Setter;
import net.savantly.sprout.core.tenancy.TenantKeyedEntity;

@Entity
@Getter @Setter
public class TenantForm extends TenantKeyedEntity {

	private String formId;
	private String title;
	private String name;
	private String path;
}
