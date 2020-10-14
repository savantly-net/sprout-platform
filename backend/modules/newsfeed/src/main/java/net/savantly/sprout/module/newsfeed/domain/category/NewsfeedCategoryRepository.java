package net.savantly.sprout.module.newsfeed.domain.category;

import net.savantly.sprout.core.tenancy.TenantedJpaRepository;
import net.savantly.sprout.core.tenancy.TenantedPrimaryKey;

public interface NewsfeedCategoryRepository extends TenantedJpaRepository<NewsfeedCategory, TenantedPrimaryKey> {

}
