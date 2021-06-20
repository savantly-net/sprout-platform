package net.savantly.sprout.domain.issue;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import net.savantly.sprout.core.tenancy.TenantedPrimaryKey;
import net.savantly.sprout.domain.issue.comment.IssueCommentDto;
import net.savantly.sprout.domain.issue.comment.IssueCommentService;
import net.savantly.sprout.easy.EasyController;

@RestController
@RequestMapping("/api/issues")
public class IssueApi extends EasyController<IssueDto, Issue, TenantedPrimaryKey, IssueService, IssueRepository> {

	private IssueCommentService issueCommentService;

	public IssueApi(IssueService service, IssueCommentService issueCommentService) {
		super(service);
		this.issueCommentService = issueCommentService;
	}
	
	
	protected TenantedPrimaryKey stringToID(String string) {
		TenantedPrimaryKey id = new TenantedPrimaryKey();
		id.setItemId(string);
		return id;
	}

	@PostMapping("/{itemId}/comment")
	public IssueCommentDto addComment(@PathVariable("itemId") String itemId, @RequestBody IssueCommentDto comment) {
		comment.setIssueId(itemId);
		return this.issueCommentService.createOne(comment);
	}
	
	@GetMapping("/{itemId}/comment")
	public List<IssueCommentDto> getComments(@PathVariable("itemId") String itemId) {
		return this.issueCommentService.getCommentsByIssueId(itemId);
	}

}
