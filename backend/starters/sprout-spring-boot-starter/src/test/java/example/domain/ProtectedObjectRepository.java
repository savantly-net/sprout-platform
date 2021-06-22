package example.domain;

import org.springframework.data.repository.PagingAndSortingRepository;

public interface ProtectedObjectRepository extends PagingAndSortingRepository<ProtectedObject, String> {

}
