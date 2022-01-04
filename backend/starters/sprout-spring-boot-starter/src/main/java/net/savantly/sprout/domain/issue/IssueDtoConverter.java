package net.savantly.sprout.domain.issue;

import com.fasterxml.jackson.databind.util.StdConverter;

public class IssueDtoConverter extends StdConverter<IssueDto, Issue> {

	@Override
	public Issue convert(IssueDto value) {
		
		Issue issue = new Issue()
				.setDescription(value.getDescription())
				.setStatus(value.getStatus())
				.setTags(value.getTags())
				.setTitle(value.getTitle());
		
//		TenantedPrimaryKey id = new TenantedPrimaryKey();
//		id.setItemId(value.getItemId());
//		id.setTenantId(TenantContext.getCurrentTenant());
//		issue.setId(id);
		
		return issue;
	}

}
