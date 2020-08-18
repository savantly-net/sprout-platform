package net.savantly.sprout.module.content.model.contentField;

import java.util.HashMap;
import java.util.Map;

import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.MapKeyColumn;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import net.savantly.sprout.core.domain.PersistedDomainObject;
import net.savantly.sprout.module.content.model.fieldType.FieldType;

@Data
@EqualsAndHashCode(callSuper=true)
@Entity
@Table(name="CONTENT_FIELD")
@AllArgsConstructor
public class ContentFieldImpl extends PersistedDomainObject implements ContentField{
	
	private String name;
	
	@Enumerated(EnumType.STRING)
	private FieldType fieldType;
	
	private boolean required;
	private int sortOrder;
	private String displayName;
	@ElementCollection
	@MapKeyColumn(name = "item_name")
	@Column(name = "item_value")
	@CollectionTable(name = "CONTENT_FIELD_METADATA")
	private Map<String, String> metaData = new HashMap<String, String>();
	
	public ContentFieldImpl(){}

}
