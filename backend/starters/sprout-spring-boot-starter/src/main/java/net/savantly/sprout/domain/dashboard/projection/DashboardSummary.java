package net.savantly.sprout.domain.dashboard.projection;

import java.util.List;

import net.savantly.sprout.core.domain.versioning.StringVersionedId;

public interface DashboardSummary {

	StringVersionedId getId();

	String getTitle();

	List<String> getTags();
}
