package net.savantly.sprout.core.content.webPageContent;

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

import net.savantly.sprout.core.content.contentItem.ContentItem;
import net.savantly.sprout.core.content.webPage.WebPage;
import net.savantly.sprout.core.domain.PersistedDomainObject;

@Entity
@Table(uniqueConstraints={
    @UniqueConstraint(columnNames = {WebPageContent.WEBPAGE_ID, WebPageContent.PLACEHOLDER_ID})
}) 
public class WebPageContent extends PersistedDomainObject {
	
	static final String WEBPAGE_ID = "webPageId";
	static final String PLACEHOLDER_ID = "placeHolderId";

	private WebPage webPage;
	private String placeHolderId;
	private List<ContentItem> contentItems = new ArrayList<>();
	
	@ManyToOne
	@JoinColumn(name=WEBPAGE_ID, nullable=false)
	public WebPage getWebPage() {
		return webPage;
	}
	public void setWebPage(WebPage webPage) {
		this.webPage = webPage;
	}
	
	@Column(name=PLACEHOLDER_ID)
	public String getPlaceHolderId() {
		return placeHolderId;
	}
	public void setPlaceHolderId(String placeHolderId) {
		this.placeHolderId = placeHolderId;
	}
	@ManyToMany(fetch=FetchType.EAGER)
	public List<ContentItem> getContentItems() {
		return contentItems;
	}
	public void setContentItems(List<ContentItem> contentItems) {
		this.contentItems = contentItems;
	}
}
