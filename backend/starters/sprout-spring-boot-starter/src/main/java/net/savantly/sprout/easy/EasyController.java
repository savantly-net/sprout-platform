package net.savantly.sprout.easy;

import java.util.Optional;

import org.springdoc.core.converters.models.PageableAsQueryParam;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

public abstract class EasyController<DTO, ENTITY, ID, S extends EasyService<DTO, ENTITY, ID, R>, R extends PagingAndSortingRepository<ENTITY, ID>> {
	
	protected S service;
	
	public EasyController(S service) {
		this.service = service;
	}
	
	/**
	 * The path parameter needs to be converted into 
	 * 
	 * @param string
	 * @return
	 */
	protected abstract ID stringToID(String string);

	/**
	 * Execute the findAll method on the EasyService instance, passing pageable query parameters if available. <br>
	 * 
	 * @param pageable Paging Parameters
	 * @return A Page of D objects
	 */
	@GetMapping
	@PageableAsQueryParam
	public Page<DTO> getAll(Pageable pageable) {
		return service.findAll(pageable);
	}

	/** 
	 * Returns a single object by the itemId, or throws an exception if the object doesn't exist
	 * 
	 * @param itemId The itemId to search for
	 * @return The found item
	 */
	@GetMapping("/{itemId}")
	public ResponseEntity<DTO> getById(@PathVariable String itemId) {
		return ResponseEntity.of(service.getById(stringToID(itemId)));
	}

	/**
	 * Calls {@code createEntity} and saves the result.<br>
	 * 
	 * @param object The object to create
	 * @return The created object
	 */
	@PostMapping
	public ResponseEntity<DTO> create(@RequestBody DTO object) {
		return ResponseEntity.status(HttpStatus.CREATED).body(service.createOne(object));
	}

	/**
	 * Calls {@code updateEntity} to updates an entity from the the DTO, and saves the result
	 * 
	 * @param itemId The entity's itemId to search for
	 * @param object The value to update the entity with
	 * @return The updated DTO
	 */
	@PutMapping("/{itemId}")
	public ResponseEntity<DTO> update(@PathVariable String itemId, @RequestBody DTO object) {
		return ResponseEntity.ok(service.updateOne(stringToID(itemId), object));
	}

	/**
	 * Delete an object by the id.
	 * 
	 * @param itemId The item's id to search for and delete
	 */
	@DeleteMapping("/{itemId}")
	public ResponseEntity<Void> deleteById(@PathVariable String itemId) {
		Optional<DTO> opt = service.getById(stringToID(itemId));
		if (opt.isPresent()) {
			service.deleteItem(opt.get());
			return ResponseEntity.accepted().build();
		} else {
			return ResponseEntity.notFound().build();
		}
	}

}
