package net.savantly.sprout.domain.file;

import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.SortedSet;
import java.util.TreeSet;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

@Getter
@Setter
@Accessors(chain = true)
public class FileDataResponse implements FileData {

	private String id;
	private String name;
	private long size;
	private String contentType;
	@JsonProperty("isDir")
	private boolean isDir;
	private ZonedDateTime modDate;
	private String color;
	private String icon;
	private String thumbnailUrl;
	private String downloadUrl;
	private String parent;
	private SortedSet<FolderChainItem> folderChain = new TreeSet<FolderChainItem>();
	
	private List<FileData> children = new ArrayList<>();

	@Override
	public long getChildrenCount() {
		return children.size();
	}
}
