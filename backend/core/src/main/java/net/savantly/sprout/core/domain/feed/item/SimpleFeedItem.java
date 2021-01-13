package net.savantly.sprout.core.domain.feed.item;

import java.time.ZonedDateTime;
import java.util.List;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

@Getter
@Setter
@Accessors(chain = true)
public class SimpleFeedItem implements FeedItem {

	private String source;
	private String id;
	private ZonedDateTime createdDate;
	private String createdBy;
	private String body;
	private List<String> tags;
}
