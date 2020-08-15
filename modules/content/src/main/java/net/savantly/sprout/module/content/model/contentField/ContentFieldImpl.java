package net.savantly.sprout.module.content.model.contentField;

import javax.persistence.Entity;
import javax.persistence.Table;

import lombok.Data;
import lombok.EqualsAndHashCode;
import net.savantly.sprout.core.domain.PersistedDomainObject;
import net.savantly.sprout.module.content.model.fieldType.FieldType;

@Data
@EqualsAndHashCode(callSuper=false)
@Entity
@Table(name="CONTENT_FIELD")
public class ContentFieldImpl extends PersistedDomainObject implements ContentField{
	
	private String name;
	private FieldType fieldType;
	private boolean required;
	private int sortOrder;
	private String displayName;

}
