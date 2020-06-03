package net.savantly.sprout.core.module.web;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SimpleNavigationItem implements NavigationItem {

	private final String title;
	private final String cssClassName;
	private final String linkTo;

}
