package net.savantly.sprout.controllers.argument;

import org.springframework.core.convert.converter.Converter;

import net.savantly.sprout.core.domain.tenant.TenantEntity;
import net.savantly.sprout.core.domain.tenant.TenantRepository;

public class TenantIdArgumentResolver implements Converter<String, TenantEntity> {
	
	private TenantRepository repo;

	public TenantIdArgumentResolver(TenantRepository repo) {
		this.repo = repo;
	}

	@Override
	public TenantEntity convert(String id) {
		return repo.findById(id).orElse(null);
	}

}
