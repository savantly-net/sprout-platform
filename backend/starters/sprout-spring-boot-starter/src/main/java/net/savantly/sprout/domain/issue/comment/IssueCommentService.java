package net.savantly.sprout.domain.issue.comment;

import java.util.List;
import java.util.stream.Collectors;

import com.fasterxml.jackson.databind.util.Converter;

import net.savantly.sprout.core.tenancy.TenantedPrimaryKey;
import net.savantly.sprout.easy.EasyService;

public class IssueCommentService extends EasyService<IssueCommentDto, IssueComment, TenantedPrimaryKey, IssueCommentRepository> {


	public IssueCommentService(
			IssueCommentRepository repository, 
			Converter<IssueCommentDto, IssueComment> dtoConverter,
			Converter<IssueComment, IssueCommentDto> entityConverter) {
		super(repository, dtoConverter, entityConverter);
	}

	public List<IssueCommentDto> getCommentsByIssueId(String issueId) {
		return this.repository.findByIssueId(issueId).stream().map(this.entityConverter::convert).collect(Collectors.toList());
	}
}
