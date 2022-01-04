package net.savantly.sprout.domain.folder;

import javax.transaction.Transactional;

import org.springframework.data.repository.CrudRepository;

public interface FolderRepository extends CrudRepository<Folder, String> {

	@Transactional
	void deleteById(String itemId);
}
