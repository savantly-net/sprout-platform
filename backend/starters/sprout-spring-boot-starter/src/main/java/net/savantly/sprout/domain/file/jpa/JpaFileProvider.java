package net.savantly.sprout.domain.file.jpa;

import java.io.IOException;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.SortedSet;
import java.util.TreeSet;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;

import org.springframework.util.StreamUtils;
import org.springframework.web.multipart.MultipartFile;

import net.savantly.sprout.domain.file.FileData;
import net.savantly.sprout.domain.file.FileDataDto;
import net.savantly.sprout.domain.file.FileDataRequest;
import net.savantly.sprout.domain.file.FileDataResponse;
import net.savantly.sprout.domain.file.FileProvider;
import net.savantly.sprout.domain.file.FolderChainItem;
import net.savantly.sprout.domain.file.SimpleFolderChainItem;

@Transactional
public class JpaFileProvider implements FileProvider {

	private JpaFileRepository repository;
	
	private FileDataDto fakeRoot = new FileDataDto().setDir(true).setId("root").setName("/");

	public JpaFileProvider(JpaFileRepository repository) {
		this.repository = repository;
	}

	@Override
	public FileDataResponse getFilesByFolder(String path) {
		FileDataDto parent = fakeRoot;

		if (Objects.nonNull(path) && (path.contentEquals("") || path.contentEquals("/") )) {
			path = null;
		}
		if (Objects.nonNull(path)) {
			path = path.replace("/", "");
		}
		
		final String key = path;
		if (Objects.nonNull(key) && !key.isEmpty() && key.length() > 0) {
			JpaFile parentFile = this.repository.findById(key).orElseThrow(()-> new EntityNotFoundException("path not found" + key));
			parent = toDto(parentFile);
		}
		
		FileDataResponse response = toFileDataResponse(parent);
		List<FileDataDto> children = this.repository.findByParent(path).stream().map(f -> toDto(f)).collect(Collectors.toList());
		response.getChildren().addAll(children);
		return response;
	}

	@Override
	public FileData storeFile(FileDataRequest metaData, MultipartFile file) {
		JpaFile entity = toEntity(metaData, file);
		repository.save(entity);
		return toDto(entity);
	}

	@Override
	public FileData createFile(FileDataRequest metaData) {
		JpaFile entity = createEntity(metaData, null);
		this.repository.save(entity);
		return toDto(entity);

	}
	
	@Override
	public void deleteFile(String id) {
		this.repository.deleteById(id);
	}

	public JpaFile getFile(String id) {
		return this.repository.findById(id).orElseThrow(() -> new EntityNotFoundException());
	}
	

	private FileDataResponse toFileDataResponse(FileDataDto parent) {
		return new FileDataResponse().setColor(parent.getColor())
				.setDir(parent.isDir())
				.setFolderChain(buildFolderChain(parent))
				.setIcon(parent.getIcon())
				.setId(parent.getId())
				.setModDate(parent.getModDate())
				.setName(parent.getName())
				.setParent(parent.getParent());
	}

	private FileDataDto toDto(JpaFileSummary file) {
		return new FileDataDto()
				.setDir(file.isDir())
				.setId(file.getId())
				.setName(file.getName())
				.setIcon(file.getIcon())
				.setParent(file.getParent())
				.setSize(file.getSize())
				.setContentType(file.getContentType())
				.setChildrenCount(this.repository.countByParent(file.getId()))
				.setDownloadUrl(String.format("/api/files/download/%s", file.getId()));
	}

	private SortedSet<FolderChainItem> buildFolderChain(FileDataDto file) {
		SortedSet<FolderChainItem> folderChain = new TreeSet<>();
		folderChain.add(fakeRootChainItem());
		
		addParentToFolderChain(file.getParent(), folderChain, 1);

		// if we're not at the root, add the current file to the end of the chain
		// using the length of the chain as the position
		if (!file.getName().contentEquals("/")) {
			folderChain.add(new SimpleFolderChainItem().setDir(file.isDir()).setId(file.getId()).setName(file.getName()).setPosition(folderChain.size()));
		}
		return folderChain;
	}

	private FolderChainItem fakeRootChainItem() {
		return new SimpleFolderChainItem().setDir(fakeRoot.isDir()).setId(fakeRoot.getId()).setName(fakeRoot.getName());
	}

	/**
	 * 
	 * @param parentId The file item to lookup and add
	 * @param folderChain  The chain to add the parent to
	 * @param position  The position to add the parent in
	 */
	private void addParentToFolderChain(String parentId, Set<FolderChainItem> folderChain, int position) {
		if (Objects.nonNull(parentId) && !parentId.isEmpty() && !parentId.contentEquals("")) {
			JpaFile parentFile = this.repository.findById(parentId)
					.orElseThrow(() -> new EntityNotFoundException("parent is missing: " + parentId));
			folderChain.add(new SimpleFolderChainItem().setId(parentFile.getId()).setName(parentFile.getName()).setPosition(position));
			addParentToFolderChain(parentFile.getParent(), folderChain, ++position);
		}
	}

	private JpaFile toEntity(FileDataRequest metaData, MultipartFile file) {
		if (Objects.isNull(metaData.getId())) {
			return createEntity(metaData, file);
		} else {
			return this.repository.findById(metaData.getId()).orElse(createEntity(metaData, file));
		}
	}

	private JpaFile createEntity(FileDataRequest metaData, MultipartFile file) {
		final JpaFile jpaFile = new JpaFile()
				.setColor(metaData.getColor())
				.setDir(metaData.isDir())
				.setIcon(metaData.getIcon())
				.setParent(metaData.getParent());
		jpaFile.setId(metaData.getId());
				
		if (Objects.nonNull(file)) {
			String name = file.getOriginalFilename();
			if (Objects.nonNull(metaData.getName()) && !metaData.getName().isEmpty()) {
				name = metaData.getName();
				if(!hasExtension(metaData.getName())) {
					String ext = extractExtension(file.getOriginalFilename());
					name = String.format("%s.%s", metaData.getName(), ext);
				}
			}
			jpaFile.setName(name).setBytes(readStream(file)).setSize(file.getSize()).setContentType(file.getContentType());
		} else {
			jpaFile.setName(metaData.getName());
		}
		
		return jpaFile;
	}

	private String extractExtension(String originalFilename) {
		if (Objects.nonNull(originalFilename)) {
			String[] parts = originalFilename.split("\\.");
			if (parts.length > 1) {
				return parts[parts.length-1];
			}
		}
		return "";
	}

	private boolean hasExtension(String name) {
		return (Objects.nonNull(name) && name.contains("."));
	}

	private byte[] readStream(MultipartFile file) {
		if (Objects.isNull(file)) {
			return null;
		}
		try {
			return StreamUtils.copyToByteArray(file.getInputStream());
		} catch (IOException e) {
			throw new RuntimeException("failed to read input stream");
		}
	}

}
