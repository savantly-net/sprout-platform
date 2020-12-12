package net.savantly.sprout.domain.file.jpa;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.util.StreamUtils;

import net.savantly.sprout.domain.file.FileData;
import net.savantly.sprout.domain.file.FileProvider;
import net.savantly.sprout.domain.file.SimpleFileData;

@Transactional
public class JpaFileProvider implements FileProvider {

	private JpaFileRepository repository;

	public JpaFileProvider(JpaFileRepository repository) {
		this.repository = repository;
	}

	@Override
	public List<FileData> getFilesByFolder(String path) {
		return this.repository.findByPath(path).stream().map(f -> toDto(f)).collect(Collectors.toList());
	}

	@Override
	public FileData storeFile(FileData metaData, InputStream data) {
		JpaFile entity = toEntity(metaData, data);
		repository.save(entity);
		return toDto(entity);
	}

	@Override
	public FileData createFolder(String path) {
		String name = null;
		String storedPath = null;
		String[] pathParts = path.split("/");
		if (pathParts.length < 1) {
			throw new RuntimeException("path must contain new folder name");
		} else if (pathParts.length < 2) {
			name = pathParts[0];
			storedPath = null;
		} else {
			name = pathParts[pathParts.length - 1];
			storedPath = path.replaceAll(String.format("/%s$", name), "");
		}

		SimpleFileData fileData = new SimpleFileData().setDir(true).setName(name).setPath(storedPath);
		JpaFile entity = createEntity(fileData, null);
		this.repository.save(entity);
		return toDto(entity);

	}
	
	private SimpleFileData toDto(JpaFileSummary file) {
		return new SimpleFileData().setDir(file.isDir()).setId(file.getId()).setName(file.getName()).setPath(file.getPath());
	}

	private JpaFile toEntity(FileData metaData, InputStream data) {
		if (Objects.isNull(metaData.getId())) {
			return createEntity(metaData, data);
		} else {
			return this.repository.findById(metaData.getId()).orElse(createEntity(metaData, data));
		}
	}

	private JpaFile createEntity(FileData metaData, InputStream data) {
		return new JpaFile().setColor(metaData.getColor()).setDir(metaData.isDir()).setIcon(metaData.getIcon())
				.setName(metaData.getName()).setPath(metaData.getPath()).setBytes(readStream(data));
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
