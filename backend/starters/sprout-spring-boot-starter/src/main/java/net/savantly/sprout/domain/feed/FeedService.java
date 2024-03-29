package net.savantly.sprout.domain.feed;

import java.time.ZonedDateTime;
import java.util.LinkedList;
import java.util.List;

import lombok.RequiredArgsConstructor;
import net.savantly.sprout.core.domain.feed.FeedContributor;
import net.savantly.sprout.core.domain.feed.item.FeedItem;

@RequiredArgsConstructor
public class FeedService {
	
	private final List<FeedContributor> contributors;

	public List<FeedItem> findItemsBeforeDate(ZonedDateTime beforeDate, int maxItems) {
		LinkedList<FeedItem> result = new LinkedList<>();
		contributors.stream().forEach(c -> {
			result.addAll(c.findBeforeDate(beforeDate, maxItems));
		});
		result.sort((x, y) -> y.getCreatedDate().compareTo(x.getCreatedDate()));
		return result;
	}

}
