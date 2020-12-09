package net.savantly.sprout.domain.menu;

import java.util.List;

public interface MenuContributor {

	default int getPriority() {
		return 0;
	};

	void contribute(List<MenuDto> dtos);

}
