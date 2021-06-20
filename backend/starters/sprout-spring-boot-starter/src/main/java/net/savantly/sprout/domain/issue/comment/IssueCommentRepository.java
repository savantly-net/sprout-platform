package net.savantly.sprout.domain.issue.comment;

import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;

import net.savantly.sprout.core.tenancy.TenantedPrimaryKey;

public interface IssueCommentRepository extends PagingAndSortingRepository<IssueComment, TenantedPrimaryKey> {
	
	List<IssueComment> findByIssueId(String issueId);

}
