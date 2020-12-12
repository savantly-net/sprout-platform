package net.savantly.sprout.domain.file;

import java.time.ZonedDateTime;

public interface FileData {
	String getId();
	String getName();
	String getPath();
	boolean isDir();
	ZonedDateTime getModDate();
	long getChildrenCount();
	String getColor();
	String getIcon();
	String getThumbnailUrl();
	String getDownloadUrl();

}