package net.savantly.sprout.domain.file;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

@Getter
@Setter
@Accessors(chain = true)
public class SimpleFolderChainItem implements FolderChainItem, Comparable<SimpleFolderChainItem> {

	private int position;
	private String id;
	private String name;
	@JsonProperty("isDir")
	private boolean isDir = true;
	
	@Override
	public int compareTo(SimpleFolderChainItem o) {
		if (o.position < position) {
			return 1;
		} else if (o.position == position) {
			return 0;
		} else {
			return -1;
		}
	}

}
