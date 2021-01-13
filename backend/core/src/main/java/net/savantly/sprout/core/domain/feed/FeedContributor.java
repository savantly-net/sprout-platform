package net.savantly.sprout.core.domain.feed;

import java.time.ZonedDateTime;
import java.util.List;

import net.savantly.sprout.core.domain.feed.item.FeedItem;

public interface FeedContributor {

	/**
	 * Implementors should return items that occur before the provided date
	 * 
	 * @param beforeDate The latest item should be before this date
	 * @param maxItems The maximum number items that should be returned
	 * @return
	 */
	List<FeedItem> findBeforeDate(ZonedDateTime beforeDate, int maxItems);
}
