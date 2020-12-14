package net.savantly.sprout.domain.file;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

@Getter
@Setter
@Accessors(chain = true)
public class FileDataRequest {

	private String id;
	private String name;
	@JsonProperty("isDir")
	private boolean isDir;
	private String color;
	private String icon = "file";
	private String parent;
}
