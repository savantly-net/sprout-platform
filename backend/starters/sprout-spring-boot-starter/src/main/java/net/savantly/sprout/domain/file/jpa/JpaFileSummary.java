package net.savantly.sprout.domain.file.jpa;

public interface JpaFileSummary {
	String getId();

	String getName();
	
	boolean isDir();

	String getColor();

	String getIcon();

	String getThumbnailUrl();

	String getParent();
}
