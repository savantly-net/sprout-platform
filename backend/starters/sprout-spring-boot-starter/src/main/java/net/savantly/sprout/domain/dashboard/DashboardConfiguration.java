package net.savantly.sprout.domain.dashboard;

import javax.servlet.ServletContext;

import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import net.savantly.sprout.domain.dashboard.panel.PanelService;
import net.savantly.sprout.domain.menu.MenuContributor;

@Configuration
public class DashboardConfiguration {

	@Bean
	public DashboardService defaultDashboardService() {
		return new DashboardService();
	}
	
	@Bean
	public DashboardsApi defaultDashboardApi(ServletContext servletContext, DashboardService service) {
		return new DashboardsApi(servletContext, service);
	}
	
	@Bean
	public PanelService defaultPanelService() {
		return new PanelService();
	}
	
	@Bean
	public DashboardConverter dashboardConverter(PanelService panelService) {
		return new DashboardConverter(panelService);
	}
	
	@Bean
	@ConditionalOnProperty(prefix = "sprout.dashboards", name = "enable-menu-items", matchIfMissing = true)
	public MenuContributor dashboardMenuContributor(DashboardRepository repository) {
		return new DashboardMenuContributor(repository);
	}
}
