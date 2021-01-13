package net.savantly.sprout.domain.feed;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import net.savantly.sprout.core.domain.feed.FeedContributor;
import net.savantly.sprout.core.domain.feed.post.FeedPostRepository;
import net.savantly.sprout.core.domain.feed.post.PostFeedContributor;
import net.savantly.sprout.domain.feed.post.FeedPostService;
import net.savantly.sprout.starter.security.context.SproutSecurityContext;

@Configuration
public class FeedConfiguration {

	@Bean
	public FeedApi feedApi(FeedService feedService, FeedPostService postService) {
		return new FeedApi(feedService, postService);
	}
	
	@Bean
	public FeedService feedService(List<FeedContributor> contributors) {
		return new FeedService(contributors);
	}
	
	@Bean
	public FeedPostService feedPostService(FeedPostRepository repo, PostFeedContributor contrib, SproutSecurityContext security) {
		return new FeedPostService(repo, contrib, security);
	}
	
	@Bean
	public PostFeedContributor postFeedContributor(FeedPostRepository repo) {
		return new PostFeedContributor(repo);
	}
}
