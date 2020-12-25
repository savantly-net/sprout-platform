package net.savantly.sprout.domain.file.s3;

import java.net.URL;
import java.time.Instant;
import java.time.temporal.ChronoUnit;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import net.savantly.sprout.autoconfigure.properties.SproutConfigurationProperties;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.GetObjectPresignRequest;

@RestController
@RequestMapping("/api/files/s3")
@RequiredArgsConstructor
public class S3FileProviderApi {

	private final SproutConfigurationProperties props;

	@GetMapping("/download/{*path}")
	public ResponseEntity<URL> getDownloadUrl(@PathVariable("path") String path) {
		S3Presigner presigner = S3Presigner.builder().build();
		URL url = presigner.presignGetObject(GetObjectPresignRequest.builder().getObjectRequest(req -> {
			req.bucket(props.getFiles().getS3().getBucketName());
			req.key(path);
			req.responseExpires(Instant.now().plus(1, ChronoUnit.HOURS));
		}).build()).url();
		return ResponseEntity.ok(url);
	}
}
