package net.savantly.sprout.domain.dashboard;

import javax.servlet.ServletContext;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import net.savantly.sprout.domain.dashboard.panel.PanelService;

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
}
