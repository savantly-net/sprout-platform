package net.savantly.sprout.domain.dashboard.projection;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;

public interface DashboardSummary {
	
	@Value("#{target.id.id}")
	String getId();

	@Value("#{target.id.id}_#{target.id.version}")
	String getUid();
	
	@Value("#{target.id.version}")
	Long getVersion();

	String getTitle();

	List<String> getTags();
	
}
