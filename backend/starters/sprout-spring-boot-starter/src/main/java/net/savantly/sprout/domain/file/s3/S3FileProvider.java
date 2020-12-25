package net.savantly.sprout.domain.file.s3;

import java.io.IOException;
import java.util.Objects;

import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;
import net.savantly.sprout.autoconfigure.properties.SproutConfigurationProperties;
import net.savantly.sprout.domain.file.FileData;
import net.savantly.sprout.domain.file.FileDataDto;
import net.savantly.sprout.domain.file.FileDataRequest;
import net.savantly.sprout.domain.file.FileDataResponse;
import net.savantly.sprout.domain.file.FileProvider;
import net.savantly.sprout.domain.file.exception.FileUploadException;
import software.amazon.awssdk.awscore.exception.AwsServiceException;
import software.amazon.awssdk.core.exception.SdkClientException;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectResponse;
import software.amazon.awssdk.services.s3.model.ListObjectsV2Request;
import software.amazon.awssdk.services.s3.model.ListObjectsV2Response;
import software.amazon.awssdk.services.s3.model.PutObjectResponse;
import software.amazon.awssdk.services.s3.model.S3Object;

@RequiredArgsConstructor
public class S3FileProvider implements FileProvider {
	
	private final SproutConfigurationProperties props;
	private final S3Client s3;

	@Override
	public FileDataResponse getFilesByFolder(String path) {
		if(Objects.isNull(path)) {
			path = "";
		}
		ListObjectsV2Response result = s3.listObjectsV2(ListObjectsV2Request.builder().bucket(props.getFiles().getS3().getBucketName())
				.prefix(path).delimiter("/").build());
		FileDataResponse response = new FileDataResponse();
		result.contents().forEach(f -> {
			response.getChildren().add(convert(f));
		});
		return response;
	}

	@Override
	public FileData storeFile(FileDataRequest request, MultipartFile file) {
		try {
			String key = createKeyFromRequest(request);
			PutObjectResponse response = s3.putObject(s3Request -> {
				s3Request.bucket(props.getFiles().getS3().getBucketName());
				s3Request.key(key);
			}, RequestBody.fromBytes(file.getBytes()));
			
			return new FileDataDto().setId(key).setDir(false).setName(request.getName()).setParent(request.getParent());
		} catch (AwsServiceException | SdkClientException | IOException e) {
			throw new FileUploadException(e.getLocalizedMessage());
		}
	}

	@Override
	public FileData createFile(FileDataRequest request) {
		try {
			String key = createKeyFromRequest(request);
			PutObjectResponse response = s3.putObject(s3Request -> {
				s3Request.bucket(props.getFiles().getS3().getBucketName());
				s3Request.key(key);
			}, RequestBody.empty());
			
			return new FileDataDto().setId(key).setDir(false).setName(request.getName()).setParent(request.getParent());
		} catch (AwsServiceException | SdkClientException e) {
			throw new FileUploadException(e.getLocalizedMessage());
		}
	}

	@Override
	public void deleteFile(String id) {
		try {
			DeleteObjectResponse response = s3.deleteObject(s3Request -> {
				s3Request.bucket(props.getFiles().getS3().getBucketName());
				s3Request.key(id);
			});
		} catch (AwsServiceException | SdkClientException e) {
			throw new FileUploadException(e.getLocalizedMessage());
		}
	}
	
	private FileDataDto convert(S3Object f) {
		return new FileDataDto().setId(f.key()).setName(lastSegment(f));
	}
	
	private String lastSegment(S3Object f) {
		String[] parts = f.key().split("/");
		if (parts.length > 0) {
			return parts[parts.length-1];
		} else {
			throw new RuntimeException("s3 key malformed??");
		}
	}

	private String createKeyFromRequest(FileDataRequest request) {
		return String.format("%s/%s", request.getParent(), request.getName());
	}


}
