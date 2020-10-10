package net.savantly.sprout.rest.crud;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityNotFoundException;

import org.springframework.data.projection.SpelAwareProxyProjectionFactory;
import org.springframework.data.repository.CrudRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


/**
 * 
 * @author Jeremy Branham
 *
 * @param <T> The Entity class
 * @param <P> The Projection interface
 * @param <ID> The Id Class
 * @param <R> The entity repository
 */
public abstract class CrudProjectionController<T, P, ID, R extends CrudRepository<T, ID>> {
	
	private final R repository;
	private final SpelAwareProxyProjectionFactory projectionFactory = new SpelAwareProxyProjectionFactory();
	private final Class<P> projectionClass;
	
	public CrudProjectionController(R repository, Class<P> projectionClass) {
		this.repository = repository;
		this.projectionClass = projectionClass;
	}
	
	@GetMapping
	public ResponseEntity<Iterable<P>> getAll() {
		return ResponseEntity.ok(convertToProjection(repository.findAll()));
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<P> getById(@PathVariable ID id) {
		return ResponseEntity.ok(convertToProjection(getObjectById(id)));
	}

	@PostMapping
	public ResponseEntity<P> create(@RequestBody T object) {
		return ResponseEntity.status(HttpStatus.CREATED).body(convertToProjection(repository.save(object)));
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<P> update(@PathVariable ID id, @RequestBody T object) {
		T existing = getObjectById(id);
		return ResponseEntity.ok(convertToProjection(repository.save(updateObject(existing, object))));
	}
	

	@DeleteMapping("/{id}")
	public void deleteById(@PathVariable ID id) {
		repository.deleteById(id);
	}
	
	/**
	 * Override this method to control the mapping of an updated object onto an existing object<br>
	 * The returned object will be persisted<br>
	 * <br>
	 * The default implementation just returns the updated object
	 * 
	 * @param existing the currently persisted object
	 * @param updated the updates received
	 * @return the object to save
	 */
	protected T updateObject(T existing, T updated) {
		return updated;
	}

	protected T getObjectById(ID id) {
		return repository.findById(id).orElseThrow(() -> new EntityNotFoundException("id: " + id));
	}
	
	protected final R getRepository() {
		return repository;
	}
	
	protected final SpelAwareProxyProjectionFactory getProjectionFactory() {
		return projectionFactory;
	}
	
	private P convertToProjection(T resourceEntity) {
		return projectionFactory.createProjection(projectionClass, resourceEntity);
	}
	
	private Iterable<P> convertToProjection(Iterable<T> resourceEntities) {
		List<P> projections = new ArrayList<P>();
		resourceEntities.iterator().forEachRemaining(item -> projections.add(convertToProjection(item)));
		return projections;
	}
}
