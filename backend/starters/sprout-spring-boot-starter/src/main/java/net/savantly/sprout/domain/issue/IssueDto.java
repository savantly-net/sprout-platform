package net.savantly.sprout.domain.issue;

import java.util.HashSet;
import java.util.Set;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;
import net.savantly.sprout.domain.issue.comment.IssueCommentDto;

@Getter
@Setter
@Accessors(chain = true)
public class IssueDto {

	private String itemId;
	private IssueState status = IssueState.OPEN;
	private String title;
	private String description;
	private Set<String> tags = new HashSet<>();
	private Set<IssueCommentDto> comments = new HashSet<>();
}
