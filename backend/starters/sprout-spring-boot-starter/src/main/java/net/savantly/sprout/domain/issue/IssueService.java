package net.savantly.sprout.domain.issue;

import com.fasterxml.jackson.databind.util.Converter;

import net.savantly.sprout.core.tenancy.TenantedPrimaryKey;
import net.savantly.sprout.easy.EasyService;

public class IssueService extends EasyService<IssueDto, Issue, TenantedPrimaryKey, IssueRepository> {

	public IssueService(
			IssueRepository repository,
			Converter<IssueDto, Issue> dtoConverter, 
			Converter<Issue, IssueDto> entityConverter) {
		super(repository, dtoConverter, entityConverter);
	}

	@Override
	protected Issue mapUpdates(Issue existing, IssueDto updates) {
		return existing.setDescription(updates.getDescription())
			.setStatus(updates.getStatus())
			.setTags(updates.getTags())
			.setTitle(updates.getTitle());
	}
}
