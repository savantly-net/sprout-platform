package net.savantly.sprout.domain.folder;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
@Transactional
public class FolderService {
	
	private final FolderRepository repo;
	
	public FolderService(FolderRepository repo) {
		this.repo = repo;
	}

	public Flux<FolderDto> getFolders() {
		List<Folder> entities = (List<Folder>) this.repo.findAll();
		Flux<FolderDto> folderDtoFlux =  Flux.defer(() -> Flux.fromIterable(toDto(entities)));
		return folderDtoFlux;

	}

	public Mono<FolderDto> createFolder(FolderDto dto) {
		Folder saved = this.repo.save(new Folder().setIcon(dto.getIcon()).setName(dto.getName()).setParent(dto.getParent()));
		///return toDto(saved);

		Mono<FolderDto> mono = Mono.just(toDto(saved));
		return mono;
	}

	public void deleteFolder(String id) {
		this.repo.deleteById(id);
		// this.repo.deleteByIdItemId(id);
	}

	private List<FolderDto> toDto(List<Folder> entities) {

		List<FolderDto> rootFolders = entities.stream().filter(e -> Objects.isNull(e.getParent())).map(e -> toDto(e)).collect(Collectors.toList());
		rootFolders.forEach(r -> {
			addChildren(r, entities, new ArrayList<>());
		});
		return rootFolders;
	}

	/*
	 * Recursively add the children
	 */
	private void addChildren(FolderDto dto, List<Folder> all, List<String> added) {
		List<FolderDto> children = all.stream().filter(f -> idIsSame(f, dto.getId())).map(f -> toDto(f)).collect(Collectors.toList());
		children.forEach(c -> {
			if (!added.contains(c.getId())) {
				c.setParent(dto.getId());
				dto.addChild(c);
				added.add(c.getId());
			}
		});
		dto.getChildren().stream().forEach(c -> addChildren(c, all, added));
	}

	private boolean idIsSame(Folder f, String dtoId) {
		if (Objects.isNull(f.getId()) && Objects.isNull(dtoId)) {
			return true;
		} else if (Objects.isNull(f.getId()) && Objects.nonNull(dtoId)) {
			return false;
		} else if (Objects.nonNull(f.getId()) && Objects.nonNull(dtoId)) {
			//return dtoId.contentEquals(f.getId().getItemId());
			return dtoId.contentEquals(f.getId());
		} else {
			return false;
		}
	}

	private FolderDto toDto(Folder entity) {
		//return new FolderDto().setIcon(entity.getIcon()).setId(entity.getId().getItemId()).setName(entity.getName());
		return new FolderDto().setIcon(entity.getIcon()).setId(entity.getId()).setName(entity.getName());
	}
}
