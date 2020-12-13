package net.savantly.sprout.domain.file;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

@Getter
@Setter
@Accessors(chain = true)
public class FileDataRequest {

	private String id;
	private String name;
	private boolean dir;
	private String color;
	private String icon = "file";
	private String parent;
}
