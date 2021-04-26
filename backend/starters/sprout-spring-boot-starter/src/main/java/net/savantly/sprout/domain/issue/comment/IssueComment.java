package net.savantly.sprout.domain.issue.comment;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;
import net.savantly.sprout.core.tenancy.TenantKeyedEntity;

@Entity
@Table(name = "ISSUE_COMMENTS")
@Getter
@Setter
@Accessors(chain = true)
public class IssueComment extends TenantKeyedEntity  {
	
	private String issueId;

	@Column(name="text", length = 5000)
	private String text;
}
