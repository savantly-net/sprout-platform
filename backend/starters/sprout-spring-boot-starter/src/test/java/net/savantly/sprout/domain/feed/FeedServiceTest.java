package net.savantly.sprout.domain.feed;

import java.time.ZonedDateTime;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringBootConfiguration;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringJUnitConfig;

import net.savantly.sprout.core.domain.feed.item.FeedItem;
import net.savantly.sprout.domain.feed.post.FeedPostDto;
import net.savantly.sprout.domain.feed.post.FeedPostService;
import net.savantly.sprout.starter.security.context.SproutSecurityContext;
import net.savantly.sprout.starter.security.context.SproutSecurityContextImpl;

@SpringJUnitConfig
@DataJpaTest
@AutoConfigureTestDatabase
@ActiveProfiles("h2")
public class FeedServiceTest {

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

	@SpringBootConfiguration
	@Import({FeedConfiguration.class})
	@EnableJpaRepositories(basePackages = "net.savantly.sprout.core.domain.feed")
	@EntityScan(basePackages = {"net.savantly.sprout.core.domain.feed"})
	static class TestContext {
		
		@Bean
		public SproutSecurityContext sproutSecurityContext() {
			return new SproutSecurityContextImpl();
		}

	}
}
