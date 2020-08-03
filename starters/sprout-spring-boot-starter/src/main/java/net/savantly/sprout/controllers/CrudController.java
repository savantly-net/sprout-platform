package net.savantly.sprout.controllers;

import javax.persistence.EntityNotFoundException;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@NoRepositoryBean
public abstract class CrudController<T, ID, R extends CrudRepository<T, ID>> {
	
	private final R repository;
	
	public CrudController(R repository) {
		this.repository = repository;
	}
	
	@GetMapping
	public ResponseEntity<Iterable<T>> getAll() {
		return ResponseEntity.ok(repository.findAll());
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<T> getById(@PathVariable ID id) {
		return ResponseEntity.ok(getObjectById(id));
	}

	@PostMapping
	public ResponseEntity<T> create(@RequestBody T object) {
		return ResponseEntity.status(HttpStatus.CREATED).body(repository.save(object));
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<T> update(@PathVariable ID id, @RequestBody T object) {
		T existing = getObjectById(id);
		return ResponseEntity.ok(repository.save(updateObject(existing, object)));
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
}
