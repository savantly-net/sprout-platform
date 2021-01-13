package net.savantly.sprout.domain.feed.post;

import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

@Getter
@Setter
@Accessors(chain = true)
public class FeedPostDto {
	
	@Size(max = 5000)
	private String body;
}
