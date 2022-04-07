package net.savantly.sprout.domain.file.s3;

import java.io.IOException;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.Objects;
import java.util.SortedSet;
import java.util.TreeSet;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;
import net.savantly.sprout.autoconfigure.properties.SproutConfigurationProperties;
import net.savantly.sprout.domain.file.FileData;
import net.savantly.sprout.domain.file.FileDataDto;
import net.savantly.sprout.domain.file.FileDataRequest;
import net.savantly.sprout.domain.file.FileDataResponse;
import net.savantly.sprout.domain.file.FileProvider;
import net.savantly.sprout.domain.file.FolderChainItem;
import net.savantly.sprout.domain.file.SimpleFolderChainItem;
import net.savantly.sprout.domain.file.exception.FileDeleteException;
import net.savantly.sprout.domain.file.exception.FileUploadException;
import software.amazon.awssdk.awscore.exception.AwsServiceException;
import software.amazon.awssdk.core.exception.SdkClientException;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.ListObjectsV2Request;
import software.amazon.awssdk.services.s3.model.ListObjectsV2Response;
import software.amazon.awssdk.services.s3.model.S3Object;

@RequiredArgsConstructor
public class S3FileProvider implements FileProvider {

	private final static Logger log = LoggerFactory.getLogger(S3FileProvider.class);
	private final SproutConfigurationProperties props;
	private final S3Client s3;

	@Override
	public FileDataResponse getFilesByFolder(String path) {
		if (Objects.isNull(path)) {
			path = "/";
		}
		if (!StringUtils.endsWithIgnoreCase(path, "/")) {
			path += "/";
		}

		if (!StringUtils.startsWithIgnoreCase(path, "/")) {
			path = "/" + path;
		}
		final String currentPath = path;
		final ListObjectsV2Response result = listObjectsByPath(currentPath);
		String name = lastSegment(result.prefix());
		if(name.isEmpty()) {
			name ="/";
		}
		final FileDataResponse response = new FileDataResponse().setDir(true).setId(result.prefix())
				.setName(name);

		// add common prefixes as directories
		result.commonPrefixes().forEach(f -> {
			FileDataDto folder = new FileDataDto().setDir(true).setId(f.prefix()).setName(lastSegment(f.prefix()));
			ListObjectsV2Response folderObjects = listObjectsByPath(f.prefix());
			folder.setChildrenCount(folderObjects.contents().size()-1l);
			response.getChildren().add(folder);
		});

		// Add objects as children
		result.contents().forEach(f -> {
			if(!f.key().contentEquals(currentPath)) {
				response.getChildren().add(convert(f));
			}
		});
		final SortedSet<FolderChainItem> chain = createFolderChainFromDirPath(currentPath, new TreeSet<FolderChainItem>(), 0);
		response.setFolderChain(chain);
		return response;
	}

	private SortedSet<FolderChainItem> createFolderChainFromDirPath(String path, TreeSet<FolderChainItem> chain, int position) {
		String name = lastSegment(path);
		if(!name.isEmpty()) {
			chain.add(new SimpleFolderChainItem().setDir(true).setId(path).setName(name).setPosition(position));
			String parentPath = allButLastSegment(path);
			createFolderChainFromDirPath(parentPath, chain, --position);
		} else {
			chain.add(new SimpleFolderChainItem().setDir(true).setId("/").setName("root").setPosition(position));
		}
		return chain;
	}

	private ListObjectsV2Response listObjectsByPath(String path) {
		log.info("listing s3 objects by path");
		return s3.listObjectsV2(ListObjectsV2Request.builder().bucket(props.getFiles().getS3().getBucketName())
				.prefix(path).delimiter("/").build());
	}

	@Override
	public FileData storeFile(FileDataRequest request, MultipartFile file) {
		if (Objects.nonNull(file)) {
			String name = file.getOriginalFilename();
			if (Objects.nonNull(request.getName()) && !request.getName().isEmpty()) {
				name = request.getName();
				if(!hasExtension(request.getName())) {
					String ext = extractExtension(file.getOriginalFilename());
					name = String.format("%s.%s", request.getName(), ext);
				}
			}

			log.info("creating key from request data");
			String key = createKeyFromRequest(request.getParent(), name, request.isDir());
			log.info("s3 key created from request data. key: {}", key);
			
			try {
				s3.putObject(s3Request -> {
					s3Request.bucket(props.getFiles().getS3().getBucketName());
					s3Request.key(key);
				}, RequestBody.fromBytes(file.getBytes()));

				return new FileDataDto().setId(key).setDir(false).setName(request.getName()).setParent(request.getParent());
			} catch (AwsServiceException | SdkClientException | IOException e) {
				throw new FileUploadException(e.getLocalizedMessage());
			}
		} else {
			return createFile(request);
		}
	}

	@Override
	public FileData createFile(FileDataRequest request) {
		try {
			String key = createKeyFromRequest(request.getParent(), request.getName(), request.isDir());
			log.info("s3 key created from request data. key: {}", key);
			s3.putObject(s3Request -> {
				s3Request.bucket(props.getFiles().getS3().getBucketName());
				s3Request.key(key);
			}, RequestBody.empty());

			return new FileDataDto().setId(key).setDir(request.isDir()).setName(request.getName()).setParent(allButLastSegment(key));
		} catch (AwsServiceException | SdkClientException e) {
			throw new FileUploadException(e.getLocalizedMessage());
		}
	}

	@Override
	public void deleteFile(String id) {
		if (!StringUtils.startsWithIgnoreCase(id, "/")) {
			id = "/" + id;
		}
		final String key = id;
		if (StringUtils.endsWithIgnoreCase(key, "/")) {
			deleteFolder(key);
		} else {
			deleteObject(key);
		}
	}

	private void deleteObject(String key) {
		try {
			log.info("s3 deleting object. key: {}", key);
			s3.deleteObject(s3Request -> {
				s3Request.bucket(props.getFiles().getS3().getBucketName());
				s3Request.key(key);
			});
		} catch (AwsServiceException | SdkClientException e) {
			throw new FileDeleteException(e.getLocalizedMessage());
		}
	}

	private void deleteFolder(String key) {
		try {
			log.info("s3 deleting folder. key: {}", key);
			listObjectsByPath(key).contents().forEach(o -> {
				deleteObject(o.key());
			});
			deleteObject(key);
		} catch (AwsServiceException | SdkClientException e) {
			throw new FileDeleteException(e.getLocalizedMessage());
		}
	}

	private FileDataDto convert(S3Object f) {
		return new FileDataDto()
			.setId(f.key())
			.setName(lastSegment(f))
			.setParent(allButLastSegment(f.key()))
			.setDownloadUrl(createDownloadUrlFromKey(f.key()))
			.setModDate(ZonedDateTime.ofInstant(f.lastModified(), ZoneId.systemDefault()));
	}

	private String createDownloadUrlFromKey(String key) {
		String path = key;
		if (!StringUtils.startsWithIgnoreCase(path, "/")) {
			path = "/" + path;
		}
		return String.format("/api/files/s3/download%s", path);
	}

	private String lastSegment(S3Object f) {
		return lastSegment(f.key());
	}

	private String lastSegment(String key) {
		String[] parts = key.split("/");
		if (parts.length > 0) {
			return parts[parts.length - 1];
		} else {
			return "";
		}
	}

	private String allButLastSegment(String key) {
		String[] parts = key.split("/");
		StringBuilder sb = new StringBuilder("/");
		for (int i = 0; i < parts.length - 1; i++) {
			sb.append(parts[i]);
			sb.append("/");
		}
		return sb.toString();
	}

	private String createKeyFromRequest(String parentName, String itemName, boolean isDir) {
		String parent = Objects.nonNull(parentName) ? parentName : "/";
		if (!StringUtils.endsWithIgnoreCase(parent, "/")) {
			parent += "/";
		}
		if (!StringUtils.startsWithIgnoreCase(parent, "/")) {
			parent = "/" + parent;
		}
		String postfix = "";
		if (isDir && !StringUtils.endsWithIgnoreCase(itemName, "/")) {
			postfix = "/";
		}
		return String.format("%s%s%s", parent, itemName, postfix);
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

}
