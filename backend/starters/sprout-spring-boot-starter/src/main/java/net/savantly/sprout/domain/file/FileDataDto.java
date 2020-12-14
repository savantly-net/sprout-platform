package net.savantly.sprout.domain.file;

import java.time.ZonedDateTime;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

@Getter
@Setter
@Accessors(chain = true)
@JsonInclude(value = Include.NON_NULL)
public class FileDataResponse implements FileData {

	private String id;
	private String name;
	private boolean dir;
	private ZonedDateTime modDate;
	private long childrenCount;
	private String color;
	private String icon;
	private String thumbnailUrl;
	private String downloadUrl;
	private String parent;
}
