package net.savantly.sprout.domain.dashboard;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

@Accessors(chain = true)
@Getter @Setter
@EqualsAndHashCode
public class DashboardSaveRequest {

	private long folderId;
	private String message;
	private boolean overwrite;
	private DashboardDto dashboard;
}
