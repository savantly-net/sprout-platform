package net.savantly.sprout.domain.user.search;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

@Getter @Setter
@Accessors(chain = true)
public class UserSearchResponseItem {

	private String itemId;
	private String userName;
	private String displayName;
}
