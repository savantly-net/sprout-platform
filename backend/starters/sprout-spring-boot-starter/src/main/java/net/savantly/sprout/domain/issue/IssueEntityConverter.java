package net.savantly.sprout.domain.issue;

import com.fasterxml.jackson.databind.util.StdConverter;

public class IssueEntityConverter extends StdConverter<Issue, IssueDto> {

	@Override
	public IssueDto convert(Issue value) {
		return new IssueDto()
				.setDescription(value.getDescription())
				.setItemId(value.getItemId())
				.setStatus(value.getStatus())
				.setTags(value.getTags())
				.setTitle(value.getTitle());
	}

}
