package net.savantly.sprout.module.content.model.webPageContent;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import net.savantly.sprout.core.domain.PersistedDomainObject;
import net.savantly.sprout.module.content.model.contentItem.ContentItemImpl;
import net.savantly.sprout.module.content.model.webPage.WebPage;

@Entity
@Table(uniqueConstraints={
    @UniqueConstraint(columnNames = {WebPageContent.WEBPAGE_ID, WebPageContent.PLACEHOLDER_ID})
},
name="WEB_PAGE_CONTENT") 
public class WebPageContent extends PersistedDomainObject {
	
	static final String WEBPAGE_ID = "webPageId";
	static final String PLACEHOLDER_ID = "placeHolderId";

	@ManyToOne
	@JoinColumn(name=WEBPAGE_ID, nullable=false)
	private WebPage webPage;
	@Column(name=PLACEHOLDER_ID)
	private String placeHolderId;
	@ManyToMany(fetch=FetchType.EAGER)
	private List<ContentItemImpl> contentItems = new ArrayList<>();
	
	public WebPage getWebPage() {
		return webPage;
	}
	public void setWebPage(WebPage webPage) {
		this.webPage = webPage;
	}
	
	public String getPlaceHolderId() {
		return placeHolderId;
	}
	public void setPlaceHolderId(String placeHolderId) {
		this.placeHolderId = placeHolderId;
	}
	public List<ContentItemImpl> getContentItems() {
		return contentItems;
	}
	public void setContentItems(List<ContentItemImpl> contentItems) {
		this.contentItems = contentItems;
	}
}
