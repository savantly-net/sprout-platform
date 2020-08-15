package net.savantly.sprout.module.content.model.contentType;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import javax.persistence.Table;

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
	
	@OneToMany(targetEntity = ContentFieldImpl.class, orphanRemoval=true, cascade= {CascadeType.ALL}, fetch=FetchType.EAGER)
	private Set<ContentField> fields = new HashSet<>();
	private boolean requiresTemplate = false;
	
	private boolean updateable;
	private String icon;

	
}
