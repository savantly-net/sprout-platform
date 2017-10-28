package net.savantly.sprout.core.content.webPage;

import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import net.savantly.sprout.core.content.webPageContent.WebPageContent;
import net.savantly.sprout.core.content.webPageLayout.WebPageLayout;
import net.savantly.sprout.core.domain.PersistedDomainObject;

@Entity
public class WebPage extends PersistedDomainObject {
	private String name;
	private String description;
	private WebPageLayout webPageLayout;
	private Set<WebPageContent> contentItems = new HashSet<>();
	private boolean home;
	
	@Column(unique=true)
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
	
	@ManyToOne
	public WebPageLayout getWebPageLayout() {
		return webPageLayout;
	}
	public void setWebPageLayout(WebPageLayout webPageLayout) {
		this.webPageLayout = webPageLayout;
	}
	
	@OneToMany(orphanRemoval=true, fetch=FetchType.EAGER, cascade= {CascadeType.ALL}, mappedBy="webPage")
	public Set<WebPageContent> getContentItems() {
		return contentItems;
	}
	public void setContentItems(Set<WebPageContent> contentItems) {
		this.contentItems = contentItems;
	}
	public boolean isHome() {
		return home;
	}
	public void setHome(boolean home) {
		this.home = home;
	}
}
