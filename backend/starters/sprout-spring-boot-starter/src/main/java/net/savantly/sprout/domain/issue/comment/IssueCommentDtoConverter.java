package net.savantly.sprout.domain.issue.comment;

import com.fasterxml.jackson.databind.util.StdConverter;


public class IssueCommentDtoConverter extends StdConverter<IssueCommentDto, IssueComment> {

	@Override
	public IssueComment convert(IssueCommentDto value) {
		IssueComment item = new IssueComment()
				.setIssueId(value.getIssueId())
				.setText(value.getText());
		/*TenantedPrimaryKey id = new TenantedPrimaryKey();
		item.setId(id);*/
		return item;
	}

}
