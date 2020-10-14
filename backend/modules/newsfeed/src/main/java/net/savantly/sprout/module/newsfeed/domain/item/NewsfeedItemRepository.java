package net.savantly.sprout.module.newsfeed.domain.item;

import net.savantly.sprout.core.tenancy.TenantedJpaRepository;
import net.savantly.sprout.core.tenancy.TenantedPrimaryKey;

public interface NewsfeedItemRepository extends TenantedJpaRepository<NewsfeedItem, TenantedPrimaryKey> {

}
