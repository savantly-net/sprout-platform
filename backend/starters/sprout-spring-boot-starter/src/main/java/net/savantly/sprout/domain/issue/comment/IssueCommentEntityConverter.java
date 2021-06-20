package net.savantly.sprout.domain.issue.comment;

import com.fasterxml.jackson.databind.util.StdConverter;

public class IssueCommentEntityConverter extends StdConverter<IssueComment, IssueCommentDto> {

	@Override
	public IssueCommentDto convert(IssueComment value) {
		return new IssueCommentDto()
				.setIssueId(value.getIssueId())
				.setText(value.getText());
	}

}
