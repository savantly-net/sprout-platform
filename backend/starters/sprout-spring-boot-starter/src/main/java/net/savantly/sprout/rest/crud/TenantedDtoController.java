//package net.savantly.sprout.rest.crud;
//
//import javax.persistence.EntityNotFoundException;
//
//import org.springdoc.core.converters.models.PageableAsQueryParam;
//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.Pageable;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.access.AccessDeniedException;
//import org.springframework.security.access.prepost.PostAuthorize;
//import org.springframework.security.access.prepost.PreAuthorize;
//import org.springframework.web.bind.annotation.DeleteMapping;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.PutMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//
//import net.savantly.sprout.core.domain.tenant.TenantSupport;
//import net.savantly.sprout.core.tenancy.TenantKeyedRepository;
//
///**
// * Specialized Rest Controller that provides standard paths, using standard http verbs for a CRUD interface.<br>
// * The implementation should convert a DTO to Entity, and an Entity to DTO
// *
// * @author jeremy branham
// *
// * @param <E> The Entity Type
// * @param <D> The DTO Type
// */
//public abstract class TenantedDtoController<E extends TenantSupport, D> {
//
//	private final TenantKeyedRepository<E> repository;
//
//	public TenantedDtoController(TenantKeyedRepository<E> repository) {
//		this.repository = repository;
//	}
//
//	/**
//	 * Create an entity instance from a DTO. The result is saved.
//	 *
//	 * @param object The DTO to use for creating an entity
//	 * @return The entity to save
//	 */
//	protected abstract E createEntity(D object);
//
//	/**
//	 * Override this method to control the mapping of an updated object onto an
//	 * existing object<br>
//	 * The returned object will be persisted<br>
//	 * <br>
//	 * If the DTO and Entity are the same type, you can return the object as-is<br>
//	 *
//	 * @param entity the currently persisted object
//	 * @param object  the updates received
//	 * @return the object to save
//	 */
//	protected abstract E updateEntity(E entity, D object);
//
//	/**
//	 * Override to convert a DTO to an entity.<br>
//	 * If the DTO and Entity are the same type, you can return the object as-is<br>
//	 *
//	 * @param entity The entity to convert to a DTO
//	 * @return The DTO to return from the REST methods
//	 */
//	protected abstract D convert(E entity);
//
//	/**
//	 * For safety, this method must be implemented to allow deleting by ID
//	 *
//	 * @param itemId
//	 * @return
//	 */
//	protected boolean canDeleteById(String itemId) {
//		return false;
//	}
//
//	/**
//	 * Execute the findAll method on the repository, passing pageable query parameters if available. <br>
//	 * Warning: this doesn't filter the results for permission. <br>
//	 *
//	 * @param pageable Paging Parameters
//	 * @return A Page of DTO objects
//	 */
//	@GetMapping
//	@PageableAsQueryParam
//	public Page<D> getAll(Pageable pageable) {
//		return repository.findAll(pageable).map(entity -> convert(entity));
//	}
//
//	/**
//	 * Returns a single object by the itemId, or throws an exception if the object doesnt exist
//	 *
//	 * @param itemId The Entity's itemId to search for
//	 * @return The found entity converted to a DTO
//	 */
//	@GetMapping("/{itemId}")
//	@PostAuthorize("hasPermission(returnObject, 'READ') or hasAuthority('ADMIN')")
//	public D getByItemId(@PathVariable String itemId) {
//		return convert(getObjectByItemId(itemId));
//	}
//
//	/**
//	 * Calls {@code createEntity} and saves the result.<br>
//	 *
//	 * @param object The DTO to convert to an entity
//	 * @return The updated DTO
//	 */
//	@PostMapping
//	@PreAuthorize("hasPermission(#object, 'CREATE') or hasAuthority('ADMIN')")
//	public ResponseEntity<D> create(@RequestBody D object) {
//		E entity = repository.save(createEntity(object));
//		return ResponseEntity.status(HttpStatus.CREATED).body(convert(entity));
//	}
//
//	/**
//	 * Calls {@code updateEntity} to updates an entity from the the DTO, and saves the result
//	 *
//	 * @param itemId The entity's itemId to search for
//	 * @param object The value to update the entity with
//	 * @return The updated DTO
//	 */
//	@PutMapping("/{itemId}")
//	@PreAuthorize("hasPermission(#object, 'UPDATE') or hasAuthority('ADMIN')")
//	public ResponseEntity<D> update(@PathVariable String itemId, @RequestBody D object) {
//		E updatedObject = updateEntity(getObjectByItemId(itemId), object);
//		return ResponseEntity.ok(convert(repository.save(updatedObject)));
//	}
//
//	/**
//	 * Delete an entity by the itemId. Calls the deleteByIdItemId repository method.
//	 *
//	 * @param itemId The enitiy's itemId to search for
//	 */
//	@DeleteMapping("/{itemId}")
//	public void deleteById(@PathVariable String itemId) {
//		if (canDeleteById(itemId)) {
//			repository.deleteByIdItemId(itemId);
//		} else throw new AccessDeniedException("cannot delete this item");
//	}
//
//	/**
//	 * Find an entity by the itemId or throw an {@code EntityNotFoundException}
//	 *
//	 * @param itemId The enitiy's itemId to search for
//	 * @return The found entity
//	 */
//	protected E getObjectByItemId(String itemId) {
//		return repository.findByIdItemId(itemId).orElseThrow(() -> new EntityNotFoundException("itemId: " + itemId));
//	}
//}
