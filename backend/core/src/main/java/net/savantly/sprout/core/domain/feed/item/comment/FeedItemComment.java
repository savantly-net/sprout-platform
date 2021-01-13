package net.savantly.sprout.core.domain.feed.item.comment;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;
import net.savantly.sprout.core.tenancy.TenantKeyedEntity;

@Entity
@Getter @Setter
@Table(name = "feed_comment")
public class FeedItemComment extends TenantKeyedEntity {
	
	private String feedItemId;

	@Size(max = 5000)
	@Column(length = 5000)
	private String text;
}
