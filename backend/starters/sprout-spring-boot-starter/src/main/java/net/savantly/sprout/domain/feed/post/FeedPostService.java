package net.savantly.sprout.domain.feed.post;

import java.util.Optional;

import lombok.RequiredArgsConstructor;
import net.savantly.sprout.core.domain.feed.item.FeedItem;
import net.savantly.sprout.core.domain.feed.post.FeedPost;
import net.savantly.sprout.core.domain.feed.post.FeedPostRepository;
import net.savantly.sprout.core.domain.feed.post.PostFeedContributor;
import net.savantly.sprout.core.domain.user.SproutUser;
import net.savantly.sprout.starter.security.context.SproutSecurityContext;

@RequiredArgsConstructor
public class FeedPostService {

	private final FeedPostRepository repo;
	private final PostFeedContributor contrib;
	private final SproutSecurityContext security;
	
	public FeedItem createPost(FeedPostDto dto) {
		FeedPost saved = repo.save(new FeedPost().setBody(dto.getBody()));
		return contrib.simpleFeedItem(saved);
	}
	
	public void deletePost(String itemId) {
		Optional<FeedPost> found = repo.findByIdItemId(itemId);
		if (found.isPresent() && isOwner(found.get())) {
			repo.delete(found.get());
		}
	}

	private boolean isOwner(FeedPost feedPost) {
		if (feedPost.getCreatedBy().isPresent()) {
			Optional<SproutUser> user = security.getCurrentUser();
			if (user.isPresent()) {
				return user.get().getUsername().contentEquals(feedPost.getCreatedBy().orElse(""));
			}
		}
		return false;
	}
}
