package net.savantly.sprout.core.domain.feed.post;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;
import net.savantly.sprout.core.tenancy.TenantKeyedEntity;

@Entity
@Getter @Setter
@Accessors(chain = true)
@Table(name = "feed_post")
public class FeedPost extends TenantKeyedEntity {
	
	@Size(max = 5000)
	@Column(length = 5000)
	private String body;
	
	@ElementCollection
	private List<String> tags = new ArrayList<>();

}
