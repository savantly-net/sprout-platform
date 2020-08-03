package net.savantly.sprout.module.content.model.webPageLayout;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Lob;
import javax.persistence.OrderColumn;
import javax.persistence.Table;

import net.savantly.sprout.core.domain.PersistedDomainObject;

@Entity
@Table(name="WEB_PAGE_LAYOUT")
public class WebPageLayout extends PersistedDomainObject {
	@Column(unique=true)
	private String name;
	private String description;
	@ElementCollection(fetch=FetchType.EAGER)
	@CollectionTable(name = "WEB_PAGE_LAYOUT_PLACEHOLDER")
	@OrderColumn(name = "index_id")
	private Set<String> placeHolders = new HashSet<>();
	@Lob
	private String template;
	private boolean showHeader = true;
	private boolean showFooter = true;
	
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

	public Set<String> getPlaceHolders() {
		return placeHolders;
	}
	public void setPlaceHolders(Set<String> placeholders) {
		this.placeHolders = placeholders;
	}
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
