package net.savantly.sprout.module.content.model.contentType;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.CascadeType;
import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.MapKeyColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import lombok.Data;
import lombok.EqualsAndHashCode;
import net.savantly.sprout.core.domain.PersistedDomainObject;
import net.savantly.sprout.module.content.model.contentField.ContentField;
import net.savantly.sprout.module.content.model.contentField.ContentFieldImpl;

@Data
@EqualsAndHashCode(callSuper = false)
@Entity
@Table(name="CONTENT_TYPE")
public class ContentTypeImpl extends PersistedDomainObject implements ContentType{

	@Column(unique=true)
	private String name;
	private String description;

	@ElementCollection
	@MapKeyColumn(name = "item_name")
	@Column(name = "item_value")
	@CollectionTable(name = "CONTENT_TYPE_METADATA")
	private Map<String, String> metaData = new HashMap<String, String>();
	
	@JsonDeserialize(contentAs = ContentFieldImpl.class)
	@OneToMany(targetEntity = ContentFieldImpl.class, cascade= {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
	@JoinColumn(name = "content_type_id")
	private List<ContentField> fields = new ArrayList<>();
	private boolean requiresTemplate = false;
	
	private boolean updateable;
	private String icon;

	
}
