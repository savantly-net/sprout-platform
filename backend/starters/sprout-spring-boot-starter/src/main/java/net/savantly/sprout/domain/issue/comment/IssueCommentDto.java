package net.savantly.sprout.domain.issue.comment;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

@Getter
@Setter
@Accessors(chain = true)
public class IssueCommentDto {
	
	private String text;

}
