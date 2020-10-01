package net.savantly.sprout.domain.dashboard;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

@Accessors(chain = true)
@Getter @Setter
@EqualsAndHashCode
public class DashboardDtoWrapper {

	private DashboardMeta meta;
	private DashboardDto dashboard;
}
