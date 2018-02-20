package net.savantly.sprout.wiki;

import javax.persistence.Entity;
import javax.persistence.Lob;

import net.savantly.sprout.core.configuration.SproutConfiguration;
import net.savantly.sprout.core.domain.PersistedDomainObject;

@Entity
public class WikiItem extends PersistedDomainObject{

	private static final long serialVersionUID = SproutConfiguration.serialVersionUID;
	private String content;
	private String title;
	
	
	@Lob
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	
	

}
