package net.savantly.sprout.model;

import java.util.List;

import lombok.Data;
import lombok.experimental.Accessors;
import net.savantly.sprout.core.module.web.NavigationItem;
import net.savantly.sprout.core.module.web.UIRoute;

@Data
@Accessors(chain = true)
public class AdminUserInterfaceModel {

	private List<String> scripts;
	private List<NavigationItem> navigationItems;
	private List<UIRoute> routes;
	
}
