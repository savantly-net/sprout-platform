package net.savantly.sprout.domain.files.s3;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.stream.Collectors;

import org.junit.After;
import org.junit.jupiter.api.Test;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import net.savantly.sprout.autoconfigure.properties.SproutConfigurationProperties;
import net.savantly.sprout.domain.file.FileData;
import net.savantly.sprout.domain.file.FileDataRequest;
import net.savantly.sprout.domain.file.s3.S3FileProvider;
import net.savantly.sprout.test.MinioContainer;
import software.amazon.awssdk.auth.credentials.AwsCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.Bucket;
import software.amazon.awssdk.services.s3.model.CreateBucketResponse;
import software.amazon.awssdk.services.s3.model.ListBucketsResponse;

public class S3FileProviderTest {
	private static final String ACCESS_KEY = "accessKey";
	private static final String SECRET_KEY = "secretKey";
	private static final String BUCKET = "bucket";

	private S3Client client = null;

	@After
	public void shutDown() {
		if (client != null) {
			client.close();
			client = null;
		}
	}

	@Test
	public void testCreateBucketAndFile() throws URISyntaxException {
		MinioContainer container = new MinioContainer(new MinioContainer.CredentialsProvider(ACCESS_KEY, SECRET_KEY));

		container.start();
		client = getClient(container);
		CreateBucketResponse bucket = client.createBucket(b -> b.bucket(BUCKET));
		assertNotNull(bucket);

		ListBucketsResponse buckets = client.listBuckets();
		assertNotNull(buckets);
		assertEquals(1, buckets.buckets().size());
		assertTrue(buckets.buckets().stream().map(Bucket::name).collect(Collectors.toList()).contains(BUCKET));

		SproutConfigurationProperties props = new SproutConfigurationProperties();
		props.getFiles().getS3().setBucketName(BUCKET);
		S3FileProvider s3FileProvider = new S3FileProvider(props, client);
		s3FileProvider.getFilesByFolder("/");
		MultipartFile file = new MockMultipartFile("test.png", new byte[0]);
		FileData fileData = s3FileProvider.storeFile(new FileDataRequest().setContentType("image").setId("/test.png"), file);
		assertNotNull(fileData.getDownloadUrl());
	}

	private S3Client getClient(MinioContainer container) throws URISyntaxException {
		return S3Client.builder().endpointOverride(new URI("http://" + container.getHostAddress()))
				.region(Region.US_EAST_2)
				.credentialsProvider(StaticCredentialsProvider.create(new AwsCredentials() {

					@Override
					public String secretAccessKey() {
						return SECRET_KEY;
					}

					@Override
					public String accessKeyId() {
						return ACCESS_KEY;
					}
				})).serviceConfiguration(b -> b.pathStyleAccessEnabled(true)).build();
	}
}
