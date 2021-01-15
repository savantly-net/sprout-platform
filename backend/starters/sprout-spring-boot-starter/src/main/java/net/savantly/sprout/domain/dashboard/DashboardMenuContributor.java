package net.savantly.sprout.domain.dashboard;

import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.function.BinaryOperator;
import java.util.function.Function;
import java.util.stream.Collectors;

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

		List<DashboardSummary> dashboards = repository.getLatestSummary();

		Map<String, DashboardSummary> latest = dashboards.stream()
				.collect(Collectors.toMap(DashboardSummary::getId, Function.identity(),
						BinaryOperator.maxBy(Comparator.comparing(DashboardSummary::getVersion))));

		latest.forEach((id, d) -> {
			dashboardsRootMenu.getChildren().add(new MenuDto().setDisplayText(d.getTitle())
					.setName(d.getUid()).setUrl("/d/" + d.getUid()));
		});

		dtos.add(dashboardsRootMenu);
	}

}
