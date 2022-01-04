package net.savantly.sprout.domain.file.s3;

import java.net.URL;
import java.time.Duration;
import java.time.Instant;
import java.time.temporal.ChronoUnit;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.HandlerMapping;

import lombok.RequiredArgsConstructor;
import net.savantly.sprout.autoconfigure.properties.SproutConfigurationProperties;
import reactor.core.publisher.Mono;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.GetObjectPresignRequest;

@RestController
@RequestMapping("/api/files/s3")
@RequiredArgsConstructor
public class S3FileProviderApi {

	private final SproutConfigurationProperties props;

	@GetMapping("/download/**")
	public ResponseEntity<Mono<URL>> getDownloadUrl(HttpServletRequest request) {

		String pathPrefix = "/download";
		String requestedUri = (String) request.getAttribute(HandlerMapping.PATH_WITHIN_HANDLER_MAPPING_ATTRIBUTE);
		int beginIndex = requestedUri.indexOf(pathPrefix) + pathPrefix.length();
		int endIndex = requestedUri.length();
		String path = requestedUri.substring(beginIndex, endIndex);

		S3Presigner presigner = S3Presigner.builder().build();
		URL url = presigner.presignGetObject(GetObjectPresignRequest.builder().getObjectRequest(req -> {
					req.bucket(props.getFiles().getS3().getBucketName());
					req.key(path);
					req.responseExpires(Instant.now().plus(1, ChronoUnit.HOURS));
				})
				.signatureDuration(Duration.ofHours(1))
				.build()).url();
		return ResponseEntity.status(HttpStatus.FOUND).header("location", url.toString()).build();
	}
}
