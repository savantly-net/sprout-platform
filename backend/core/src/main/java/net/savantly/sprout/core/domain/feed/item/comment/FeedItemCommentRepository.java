package net.savantly.sprout.core.domain.feed.item.comment;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import net.savantly.sprout.core.tenancy.TenantedJpaRepository;
import net.savantly.sprout.core.tenancy.TenantedPrimaryKey;

public interface FeedItemCommentRepository extends TenantedJpaRepository<FeedItemComment, TenantedPrimaryKey> {

	Page<FeedItemComment> findByFeedItemId(String feedItemId, Pageable pageable);
}
