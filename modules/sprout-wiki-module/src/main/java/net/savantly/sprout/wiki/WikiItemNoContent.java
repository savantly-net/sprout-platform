package net.savantly.sprout.wiki;

import org.springframework.data.rest.core.config.Projection;

@Projection(types={WikiItem.class})
public interface WikiItemNoContent {
	
	String getId();
	String getTitle();

}
