package net.savantly.sprout.domain.issue;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import net.savantly.sprout.domain.issue.comment.IssueCommentDtoConverter;
import net.savantly.sprout.domain.issue.comment.IssueCommentEntityConverter;
import net.savantly.sprout.domain.issue.comment.IssueCommentRepository;
import net.savantly.sprout.domain.issue.comment.IssueCommentService;

@Configuration
public class IssueConfiguration {

	@Bean
	public IssueApi issueApi(IssueService issueService, IssueCommentService issueCommentService) {
		return new IssueApi(issueService, issueCommentService);
	}
	
	@Bean
	public IssueService issueService(IssueRepository repo) {
		return new IssueService(repo, new IssueDtoConverter(), new IssueEntityConverter());
	}

	@Bean
	public IssueCommentService issueCommentService(IssueCommentRepository repo) {
		return new IssueCommentService(repo, new IssueCommentDtoConverter(), new IssueCommentEntityConverter());
	}
}
