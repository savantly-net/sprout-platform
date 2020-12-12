package net.savantly.sprout.domain.file;

import java.time.ZonedDateTime;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

@Getter
@Setter
@Accessors(chain = true)
public class SimpleFileData implements FileData {

	private String id;
	private String name;
	private boolean dir;
	private ZonedDateTime modDate;
	private long childrenCount;
	private String color;
	private String icon;
	private String thumbnailUrl;
	private String downloadUrl;
	private String path;
}
