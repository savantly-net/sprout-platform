package net.savantly.sprout.core.domain.feed.item.comment;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeedItemCommentRepository extends JpaRepository<FeedItemComment, String> {

	Page<FeedItemComment> findByFeedItemId(String feedItemId, Pageable pageable);
}
