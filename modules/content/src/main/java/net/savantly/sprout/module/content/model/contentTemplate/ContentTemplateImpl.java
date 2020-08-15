package net.savantly.sprout.module.content.model.contentTemplate;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Lob;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.Data;
import lombok.EqualsAndHashCode;
import net.savantly.sprout.core.domain.PersistedDomainObject;
import net.savantly.sprout.module.content.model.contentItem.ContentItem;
import net.savantly.sprout.module.content.model.contentItem.ContentItemImpl;

@Data
@EqualsAndHashCode(callSuper = false)
@Entity
@Table(name="CONTENT_TEMPLATE")
public class ContentTemplateImpl extends PersistedDomainObject implements ContentTemplate{

	@Column(unique=true)
	private String name;
	private String description;
	@Lob
	private String content;
	@OneToMany(targetEntity = ContentItemImpl.class)
	private Set<ContentItem> contentItems = new HashSet<ContentItem>();

}
