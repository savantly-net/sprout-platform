package net.savantly.sprout.core.domain.feed.item;

import java.time.ZonedDateTime;
import java.util.List;

public interface FeedItem {

	/**
	 * @return
	 * The source contributor, used as part of the key for association to comments<br>
	 * This should never change, should be unique among feed contributors, and should be the same for all FeedItems produced by this contributor
	 * 
	 */
	String getSource();
	
	/**
	 * @return
	 * An internal identifier that this contributor knows, and should be immutable <br>
	 * Used as part of the key and is referenced for association to comments
	 */
	String getId();
	
	/**
	 * @return
	 * The date this feed item was created
	 */
	ZonedDateTime getCreatedDate();
	
	/**
	 * @return
	 * The user or system display name of the creator of this FeedItem
	 */
	String getCreatedBy();
	
	/**
	 * @return
	 * The body of this FeedItem, which can contain Markdown
	 */
	String getBody();
	
	/**
	 * @return
	 * A list of "tags" that this item is associated with
	 */
	List<String> getTags();
}
