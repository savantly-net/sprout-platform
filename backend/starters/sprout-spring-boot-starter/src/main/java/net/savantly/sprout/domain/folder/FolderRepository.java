package net.savantly.sprout.domain.folder;

import javax.transaction.Transactional;

import net.savantly.sprout.core.tenancy.TenantedJpaRepository;
import net.savantly.sprout.core.tenancy.TenantedPrimaryKey;

public interface FolderRepository extends TenantedJpaRepository<Folder, TenantedPrimaryKey> {

	@Transactional
	void deleteByIdItemId(String itemId);
}
