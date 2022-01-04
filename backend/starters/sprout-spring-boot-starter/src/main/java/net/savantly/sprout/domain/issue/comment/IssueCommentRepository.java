package net.savantly.sprout.domain.issue.comment;

import java.util.List;

import org.springframework.data.repository.CrudRepository;


public interface IssueCommentRepository extends CrudRepository<IssueComment, String> {

	List<IssueComment> findByIssueId(String issueId);

}

