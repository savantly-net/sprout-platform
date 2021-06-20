package net.savantly.sprout.easy;

import java.util.Objects;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;

import com.fasterxml.jackson.databind.util.Converter;

import net.savantly.sprout.starter.problem.EntityNotFoundProblem;

public abstract class EasyService<D, E, ID, R extends PagingAndSortingRepository<E, ID>> {
	
	protected R repository;
	protected final Converter<D, E> dtoConverter;
	protected final Converter<E, D> entityConverter;
	
	/**
	 * Create an EasyService using the supplied repository with custom converters. 
	 * 
	 * @param repository
	 * @param dtoConverter
	 * @param entityConverter
	 */
	public EasyService(
			R repository, 
			Converter<D, E> dtoConverter, 
			Converter<E, D> entityConverter) {
		this.repository = repository;
		this.dtoConverter = dtoConverter;
		this.entityConverter = entityConverter;
	}

	/**
	 * Important - this does not filter because the page attributes would be invalid.<br>
	 * Use @Query on your repo method to filter instead<br>
	 * Or override this method and filter in the subclass
	 * 
	 * @param pageable
	 * @return
	 */
	public Page<D> findAll(Pageable pageable) {
		if (Objects.isNull(pageable)) {
			pageable = PageRequest.of(0, 50);
		}
		return repository.findAll(pageable).map(entityConverter::convert);
	}

	/**
	 * Calls permission evaluator after fetching.
	 * 
	 * @param itemId
	 * @return
	 */
	@PostAuthorize("hasPermission(returnObject, 'READ') or hasAuthority('ADMIN')")
	public D getById(ID itemId) {
		Optional<E> item = repository.findById(itemId);
		if (item.isPresent()) {
			return entityConverter.convert(item.get());
		} else {
			throw new EntityNotFoundProblem(this.getClass().getTypeParameters()[1].getTypeName(), itemId.toString());
		}
	}

	/**
	 * Calls permission evaluator before creating
	 * 
	 * @param object
	 * @return
	 */
	@PreAuthorize("hasPermission(#object, 'CREATE') or hasAuthority('ADMIN')")
	public D createOne(D object) {
		E saved = repository.save(dtoConverter.convert(object));
		return entityConverter.convert(saved);
	}

	/**
	 * Calls permission evaluator before updating<br>
	 * Override {@link #mapUpdates(Object)} to control mapping of DTO onto existing Entity
	 * 
	 * @param object
	 * @return
	 */
	@PreAuthorize("hasPermission(#object, 'UPDATE') or hasAuthority('ADMIN')")
	public D updateOne(D object) {
		E saved = repository.save(mapUpdates(object));
		return entityConverter.convert(saved);
	}

	/**
	 * Calls permission evaluator before calling delete on repository.
	 * @param object item to delete
	 */
	@PreAuthorize("hasPermission(#object, 'DELETE') or hasAuthority('ADMIN')")
	public void deleteItem(D object) {
		repository.delete(dtoConverter.convert(object));
	}
	
	/**
	 * Override {@link #mapUpdates(Object)} to control mapping of DTO onto existing Entity
	 * @param updates
	 * @return Entity to save
	 */
	protected E mapUpdates(D updates) {
		return dtoConverter.convert(updates);
	}

}
