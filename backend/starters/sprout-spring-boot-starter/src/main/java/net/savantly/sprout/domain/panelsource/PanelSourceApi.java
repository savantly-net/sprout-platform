package net.savantly.sprout.domain.panelsource;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import net.savantly.sprout.core.tenancy.TenantKeyedRepository;
import net.savantly.sprout.rest.crud.TenantedDtoController;

@RestController
@RequestMapping("/api/page-source")
public class PanelSourceApi extends TenantedDtoController<PanelSource, PanelSource> {

	public PanelSourceApi(TenantKeyedRepository<PanelSource> repository) {
		super(repository);
	}

	@Override
	protected PanelSource createEntity(PanelSource object) {
		return object;
	}

	@Override
	protected PanelSource updateEntity(PanelSource entity, PanelSource object) {
		return object;
	}

	@Override
	protected PanelSource convert(PanelSource entity) {
		return entity;
	}

}
