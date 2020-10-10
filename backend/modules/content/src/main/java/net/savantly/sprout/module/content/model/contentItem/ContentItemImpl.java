package net.savantly.sprout.module.content.model.contentItem;

import java.util.HashMap;
import java.util.Map;

import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapKeyColumn;
import javax.persistence.Table;

import lombok.Data;
import lombok.EqualsAndHashCode;
import net.savantly.sprout.core.domain.PersistedDomainObject;
import net.savantly.sprout.module.content.model.contentTemplate.ContentTemplate;
import net.savantly.sprout.module.content.model.contentTemplate.ContentTemplateImpl;
import net.savantly.sprout.module.content.model.contentType.ContentType;
import net.savantly.sprout.module.content.model.contentType.ContentTypeImpl;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name="CONTENT_ITEM")
public class ContentItemImpl extends PersistedDomainObject implements TemplatedContentItem {

	@Column(unique=true)
	private String name;
	private String description;
	
	@ManyToOne(targetEntity = ContentTypeImpl.class)
	private ContentType contentType;
	
	@ElementCollection(fetch=FetchType.EAGER)
	@CollectionTable(name = "FIELD_VALUES", joinColumns = @JoinColumn(name = "CONTENT_ITEM_ID"))
	@MapKeyColumn(name="CONTENT_FIELD_ID")
	@Column(name = "CONTENT_FIELD_VALUE")
	private Map<String, String> fieldValues = new HashMap<>();
	
	@ManyToOne(targetEntity = ContentTemplateImpl.class)
	private ContentTemplate template;

}