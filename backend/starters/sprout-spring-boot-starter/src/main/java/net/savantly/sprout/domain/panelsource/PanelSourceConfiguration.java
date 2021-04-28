package net.savantly.sprout.domain.panelsource;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import net.savantly.sprout.core.tenancy.TenantKeyedRepository;

@Configuration
public class PanelSourceConfiguration {

	@Bean
	public PanelSourceApi panelSourceApi(TenantKeyedRepository<PanelSource> repo) {
		return new PanelSourceApi(repo);
	}

}
