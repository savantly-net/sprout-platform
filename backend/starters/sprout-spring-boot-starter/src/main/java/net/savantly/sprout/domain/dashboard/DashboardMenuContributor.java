package net.savantly.sprout.domain.dashboard;

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
