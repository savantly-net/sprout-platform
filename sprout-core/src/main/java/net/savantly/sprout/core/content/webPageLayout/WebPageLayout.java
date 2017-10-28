package net.savantly.sprout.core.content.webPageLayout;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Lob;
import javax.persistence.OrderColumn;

import net.savantly.sprout.core.domain.PersistedDomainObject;

@Entity
public class WebPageLayout extends PersistedDomainObject {
	private String name;
	private String description;
	private Set<String> placeHolders = new HashSet<>();
	private String template;
	private boolean showHeader = true;
	private boolean showFooter = true;
	
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

	@ElementCollection(fetch=FetchType.EAGER)
	@CollectionTable(name = "WEB_PAGE_LAYOUT_PLACEHOLDER")
	@OrderColumn(name = "index_id")
	public Set<String> getPlaceHolders() {
		return placeHolders;
	}
	public void setPlaceHolders(Set<String> placeholders) {
		this.placeHolders = placeholders;
	}
	@Lob
	public String getTemplate() {
		return template;
	}
	public void setTemplate(String template) {
		this.template = template;
	}
	public boolean isShowHeader() {
		return showHeader;
	}
	public void setShowHeader(boolean showHeader) {
		this.showHeader = showHeader;
	}
	public boolean isShowFooter() {
		return showFooter;
	}
	public void setShowFooter(boolean showFooter) {
		this.showFooter = showFooter;
	}
}
