package net.savantly.sprout.domain.folder;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/folders")
@Transactional
public class FolderApi {


	private final FolderService service;

	public FolderApi(FolderService service) {
		this.service = service;
	}

	@GetMapping
	public ResponseEntity<Flux<FolderDto>> getFolders() {
		Flux<FolderDto> folders = service.getFolders();
		return ResponseEntity.ok(folders);
	}


	@PostMapping
	@PreAuthorize("hasAuthority('FOLDER_CREATE')")
	public ResponseEntity<Mono<FolderDto>> createFolder(@RequestBody FolderDto dto) {
		return ResponseEntity.ok(service.createFolder(dto));
	}

	@PreAuthorize("hasAuthority('FOLDER_DELETE')")
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteFolder(@PathVariable("id") String id) {
		service.deleteFolder(id);
		return ResponseEntity.ok().build();
	}


}
