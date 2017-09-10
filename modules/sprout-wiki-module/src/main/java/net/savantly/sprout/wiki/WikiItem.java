package net.savantly.sprout.wiki;

import javax.persistence.Entity;
import javax.persistence.Lob;
import javax.validation.constraints.Size;

import org.joda.time.DateTime;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;

@Entity
public class WikiItem {
	
	private String id;
	private int version;
	@CreatedBy
	private String createdBy;
	@CreatedDate
	private DateTime created;
	private String content;
	
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public int getVersion() {
		return version;
	}
	public void setVersion(int version) {
		this.version = version;
	}
	public String getCreatedBy() {
		return createdBy;
	}
	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}
	public DateTime getCreated() {
		return created;
	}
	public void setCreated(DateTime created) {
		this.created = created;
	}
	
	@Lob
    @Size(max=2000)
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	
	

}
