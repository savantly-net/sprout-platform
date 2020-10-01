package net.savantly.sprout.domain.dashboard;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

@Accessors(chain = true)
@Getter @Setter
@EqualsAndHashCode
public class DashboardSaveResponse {
	
	private long id;
	private String slug;
	private String url;
	private String status;
	private String uid;
	private long version;

}
