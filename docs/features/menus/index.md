---
title: Menus
description: Customize Menus
---

Menus can be modified by the server application, modified/contributed by plugins, and configured in the UI.  

"Root" menus appear in the left side-menu navigation, and can be nested.  

### Menu Editor
UI Menu editor is still in progress, but a JSON editor is provided.  

Example menu json -  

```json
[
    {
        "name": "my-menu",
        "icon": "cube",
        "displayText": "My Menu",
        "url": "/to-my-page",
        "position": 0,
        "children": [{
            "name": "my-sub-menu",
            "icon": "cube",
            "displayText": "My Sub Menu",
            "url": "/to-my-sub-page",
            "position": 0,
            "children": []
        }]
    }
]
```

![menu editor](/img/examples/menu_config.png)  



### Server side menu contribution  
All MenuContributor beans are processed to modify the Menu structure provided by the REST API -  

```java
import java.util.List;
import net.savantly.sprout.domain.dashboard.projection.DashboardSummary;
import net.savantly.sprout.domain.menu.MenuContributor;
import net.savantly.sprout.domain.menu.MenuDto;

public class DashboardMenuContributor implements MenuContributor {

	private final DashboardRepository repository;

	public DashboardMenuContributor(DashboardRepository repository) {
		this.repository = repository;
	}

	@Override
	public void contribute(List<MenuDto> dtos) {
		MenuDto dashboardsRootMenu = new MenuDto().setIcon("apps").setDisplayText("Dashboards").setName("dashboards");

		List<DashboardSummary>  dashboards = repository.getLatestSummary();
		dashboards.forEach(d -> {
			dashboardsRootMenu.getChildren().add(new MenuDto().setDisplayText(d.getTitle())
					.setName(d.getId().toString()).setUrl("/d/" + d.getId().toString()));
		});
		
		dtos.add(dashboardsRootMenu);
	}
}
```

