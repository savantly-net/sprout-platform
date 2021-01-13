package net.savantly.sprout.domain.issue;

import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import net.savantly.sprout.core.tenancy.TenantKeyedRepository;
import net.savantly.sprout.domain.issue.comment.IssueComment;
import net.savantly.sprout.domain.issue.comment.IssueCommentDto;
import net.savantly.sprout.rest.crud.TenantedDtoController;

@RestController
@RequestMapping("/api/issues")
public class IssueApi extends TenantedDtoController<Issue, IssueDto> {

	public IssueApi(TenantKeyedRepository<Issue> repository) {
		super(repository);
	}

	@PostMapping("/{itemId}/comment")
	public IssueCommentDto addComment(@PathVariable("itemId") String itemId, @RequestBody IssueCommentDto comment) {
		Issue issue = this.getObjectByItemId(itemId);
		IssueComment commentEntity = createCommentEntity(issue, comment);
		issue.addComment(commentEntity);
		return convert(commentEntity);
	}

	private IssueCommentDto convert(IssueComment commentEntity) {
		return new IssueCommentDto().setText(commentEntity.getText());
	}

	@Override
	protected IssueDto convert(Issue entity) {
		return new IssueDto().setComments(convert(entity.getComments())).setDescription(entity.getDescription())
				.setItemId(entity.getItemId()).setTags(entity.getTags()).setTitle(entity.getTitle())
				.setStatus(entity.getStatus());
	}

	private Set<IssueCommentDto> convert(Set<IssueComment> comments) {
		return comments.stream().map(entity -> convert(entity)).collect(Collectors.toSet());
	}

	@Override
	protected Issue createEntity(IssueDto object) {
		return new Issue().setDescription(object.getDescription()).setTags(object.getTags()).setTitle(object.getTitle())
				.setStatus(object.getStatus());
	}

	private IssueComment createCommentEntity(Issue issue, IssueCommentDto dto) {
		return new IssueComment().setIssueId(issue.getItemId()).setText(dto.getText());
	}

	@Override
	protected Issue updateEntity(Issue entity, IssueDto object) {
		return entity.setDescription(object.getDescription()).setTags(object.getTags()).setTitle(object.getTitle())
				.setStatus(object.getStatus());
	}

}
