package net.savantly.sprout.rest.crud;

import javax.persistence.EntityNotFoundException;

import org.springdoc.core.converters.models.PageableAsQueryParam;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import net.savantly.sprout.core.domain.tenant.TenantSupport;
import net.savantly.sprout.data.repository.TenantKeyedRepository;

/**
 * Specialized Rest Controller that converts a DTO to Entity and persists
 * 
 * @author jeremy branham
 *
 * @param <E>
 * @param <D>
 */
public abstract class TenantedDtoController<E extends TenantSupport, D> {

	private final TenantKeyedRepository<E> repository;

	public TenantedDtoController(TenantKeyedRepository<E> repository) {
		this.repository = repository;
	}

	protected abstract E convert(D object);

	protected abstract D convert(E entity);

	@GetMapping
	@PageableAsQueryParam
	public ResponseEntity<Page<D>> getAll(Pageable pageable) {
		return ResponseEntity.ok(repository.findAll(pageable).map(entity -> convert(entity)));
	}

	@GetMapping("/{itemId}")
	public ResponseEntity<D> getByItemId(@PathVariable String itemId) {
		return ResponseEntity.ok(convert(getObjectByItemId(itemId)));
	}

	@PostMapping
	public ResponseEntity<D> create(@RequestBody D object) {
		E entity = repository.save(convert(object));
		return ResponseEntity.status(HttpStatus.CREATED).body(convert(entity));
	}

	@PutMapping("/{itemId}")
	public ResponseEntity<D> update(@PathVariable String itemId, @RequestBody D object) {
		E converted = convert(object);
		E updatedObject = updateObject(getObjectByItemId(itemId), converted);
		return ResponseEntity.ok(convert(repository.save(updatedObject)));
	}

	@DeleteMapping("/{itemId}")
	public void deleteById(@PathVariable String itemId) {
		repository.deleteByIdItemId(itemId);
	}

	/**
	 * Override this method to control the mapping of an updated object onto an
	 * existing object<br>
	 * The returned object will be persisted<br>
	 * <br>
	 * The default implementation just returns the updated object
	 * 
	 * @param existing the currently persisted object
	 * @param updated  the updates received
	 * @return the object to save
	 */
	protected E updateObject(E existing, E updated) {
		return updated;
	}

	protected E getObjectByItemId(String id) {
		return repository.findByIdItemId(id).orElseThrow(() -> new EntityNotFoundException("id: " + id));
	}
}
