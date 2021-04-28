package net.savantly.sprout.domain.feed;

import java.time.ZonedDateTime;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Configuration;

import net.savantly.sprout.core.domain.feed.item.FeedItem;
import net.savantly.sprout.domain.feed.post.FeedPostDto;
import net.savantly.sprout.domain.feed.post.FeedPostService;
import net.savantly.sprout.test.AbstractContainerBaseTest;
import net.savantly.sprout.test.IntegrationTest;

@SpringBootTest
@IntegrationTest
public class FeedServiceTest extends AbstractContainerBaseTest {

	@Autowired
	FeedService service;
	@Autowired
	FeedPostService posts;

	@Test
	public void testFeedService() {
		service.findItemsBeforeDate(ZonedDateTime.now(), 10);
	}

	@Test
	public void testFeedPosts() {
		FeedItem result = posts.createPost(new FeedPostDto().setBody("TEST"));
		posts.deletePost(result.getId());
	}

	@Configuration
	@EnableAutoConfiguration
	static class TestContext {

	}
}
