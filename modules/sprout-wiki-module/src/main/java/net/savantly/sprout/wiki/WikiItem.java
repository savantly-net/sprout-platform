package net.savantly.sprout.wiki;

import javax.persistence.Entity;
import javax.persistence.Lob;
import javax.validation.constraints.Size;

import net.savantly.sprout.core.configuration.CoreConfiguration;
import net.savantly.sprout.core.domain.PersistedModule;

@Entity
public class WikiItem extends PersistedModule{

	private static final long serialVersionUID = CoreConfiguration.serialVersionUID;
	private String content;
	private String title;
	
	
	@Lob
    @Size(max=2000)
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
