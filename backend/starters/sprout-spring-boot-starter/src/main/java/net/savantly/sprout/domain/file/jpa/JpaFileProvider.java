package net.savantly.sprout.domain.file.jpa;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;

import org.springframework.util.StreamUtils;

import net.savantly.sprout.domain.file.FileData;
import net.savantly.sprout.domain.file.FileDataRequest;
import net.savantly.sprout.domain.file.FileDataResponse;
import net.savantly.sprout.domain.file.FileProvider;

@Transactional
public class JpaFileProvider implements FileProvider {

	private JpaFileRepository repository;

	public JpaFileProvider(JpaFileRepository repository) {
		this.repository = repository;
	}

	@Override
	public List<FileData> getFilesByFolder(String path) {
		return this.repository.findByParent(path).stream().map(f -> toDto(f)).collect(Collectors.toList());
	}

	@Override
	public FileData storeFile(FileDataRequest metaData, InputStream data) {
		JpaFile entity = toEntity(metaData, data);
		repository.save(entity);
		return toDto(entity);
	}

	@Override
	public FileData createFile(FileDataRequest metaData) {
		JpaFile entity = createEntity(metaData, null);
		this.repository.save(entity);
		return toDto(entity);

	}

	public JpaFile getFile(String id) {
		return this.repository.findById(id).orElseThrow(() -> new EntityNotFoundException());
	}

	private FileDataResponse toDto(JpaFileSummary file) {
		return new FileDataResponse().setDir(file.isDir()).setId(file.getId()).setName(file.getName())
				.setParent(file.getParent()).setDownloadUrl(String.format("/api/files/download/%s", file.getId()));
	}

	private JpaFile toEntity(FileDataRequest metaData, InputStream data) {
		if (Objects.isNull(metaData.getId())) {
			return createEntity(metaData, data);
		} else {
			return this.repository.findById(metaData.getId()).orElse(createEntity(metaData, data));
		}
	}

	private JpaFile createEntity(FileDataRequest metaData, InputStream data) {
		return new JpaFile().setColor(metaData.getColor()).setDir(metaData.isDir()).setIcon(metaData.getIcon())
				.setName(metaData.getName()).setParent(metaData.getParent()).setBytes(readStream(data));
	}

	private byte[] readStream(InputStream data) {
		if (Objects.isNull(data)) {
			return null;
		}
		try {
			return StreamUtils.copyToByteArray(data);
		} catch (IOException e) {
			throw new RuntimeException("failed to read input stream");
		}
	}

}
