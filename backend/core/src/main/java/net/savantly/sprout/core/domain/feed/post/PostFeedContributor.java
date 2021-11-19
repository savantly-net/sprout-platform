package net.savantly.sprout.core.domain.feed.post;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;

import lombok.RequiredArgsConstructor;
import net.savantly.sprout.core.domain.feed.FeedContributor;
import net.savantly.sprout.core.domain.feed.item.FeedItem;
import net.savantly.sprout.core.domain.feed.item.SimpleFeedItem;

@RequiredArgsConstructor
public class PostFeedContributor implements FeedContributor {
	
	private final FeedPostRepository repo;
	private final String SOURCE = "FEED_POST";

	@Override
	public List<FeedItem> findBeforeDate(ZonedDateTime beforeDate, int maxItems) {
		Page<FeedPost> page = repo.findAll(PageRequest.of(0, maxItems, Direction.DESC, "createdDate"));
		return page.stream().map(p -> simpleFeedItem(p)).collect(Collectors.toList());
	}

	public SimpleFeedItem simpleFeedItem(FeedPost p) {
		return new SimpleFeedItem()
				.setBody(p.getBody())
				.setCreatedBy(p.getCreatedBy().orElse("post"))
				.setCreatedDate(p.getCreatedDate().orElse(ZonedDateTime.now()))
				.setId(p.getId())
				.setSource(SOURCE)
				.setTags(p.getTags());
	}
}
