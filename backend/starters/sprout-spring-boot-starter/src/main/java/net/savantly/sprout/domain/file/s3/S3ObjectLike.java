package net.savantly.sprout.domain.file.s3;

import java.time.ZonedDateTime;

public interface S3ObjectLike {
	String getKey();
	ZonedDateTime getLastModifiedDate();
	String getContentType();
}
