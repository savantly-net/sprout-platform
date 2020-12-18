package net.savantly.sprout.domain.issue;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;
import net.savantly.sprout.core.tenancy.TenantKeyedEntity;
import net.savantly.sprout.domain.issue.comment.IssueComment;

@Entity
@Table(name = "issues")
@Getter
@Setter
@Accessors(chain = true)
public class Issue extends TenantKeyedEntity {
	
	private String title;

	@Column(length = 5000)
	private String description;
	
	@ElementCollection
	private Set<String> tags = new HashSet<>();
	
	@OneToMany
	private Set<IssueComment> comments = new HashSet<>();
	
	public Issue addComment(IssueComment comment) {
		this.comments.add(comment);
		return this;
	}
}
