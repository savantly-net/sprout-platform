package example.domain;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import net.savantly.sprout.core.tenancy.TenantKeyedRepository;
import net.savantly.sprout.rest.crud.TenantedDtoController;

@Service
public class ProtectedApi extends TenantedDtoController<ProtectedObject, ProtectedObject> {

	public ProtectedApi(TenantKeyedRepository<ProtectedObject> repository) {
		super(repository);
	}

	@Override
	protected ProtectedObject createEntity(ProtectedObject object) {
		return object;
	}

	@Override
	protected ProtectedObject updateEntity(ProtectedObject entity, ProtectedObject object) {
		return object;
	}

	@Override
	protected ProtectedObject convert(ProtectedObject entity) {
		return entity;
	}
	
	@Override
	protected boolean canDeleteById(String itemId) {
		return true;
	}
	
	@Override
	@PreAuthorize("hasPermission(#itemId, 'example.domain.ProtectedObject', 'DELETE')")
	public void deleteById(String itemId) {
		super.deleteById(itemId);
	}

}