package net.savantly.sprout.module.content.model.webPage;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import net.savantly.sprout.core.domain.PersistedDomainObject;
import net.savantly.sprout.module.content.model.webPageContent.WebPageContent;
import net.savantly.sprout.module.content.model.webPageLayout.WebPageLayout;

@Entity
@Table(name="WEB_PAGE")
public class WebPage extends PersistedDomainObject {
	
	@Column(unique=true)
	private String name;
	private String description;
	@ManyToOne
	private WebPageLayout webPageLayout;
	@OneToMany(cascade= {CascadeType.ALL}, mappedBy="webPage")
	private Set<WebPageContent> contentItems;
	private boolean home;
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	
	public WebPageLayout getWebPageLayout() {
		return webPageLayout;
	}
	public void setWebPageLayout(WebPageLayout webPageLayout) {
		this.webPageLayout = webPageLayout;
	}
	
	public Set<WebPageContent> getContentItems() {
		return contentItems;
	}
	public void setContentItems(Set<WebPageContent> contentItems) {
		if (this.contentItems == null) {
			this.contentItems = contentItems;
		} else {
			this.contentItems.retainAll(contentItems);
			this.contentItems.addAll(contentItems);
		}
	}
	public boolean isHome() {
		return home;
	}
	public void setHome(boolean home) {
		this.home = home;
	}
}
