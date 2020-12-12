package net.savantly.sprout.domain.file;

import java.io.InputStream;
import java.util.List;

public interface FileProvider {
	
	List<FileData> getFilesByFolder(String path);
	FileData storeFile(FileData metaData, InputStream inputStream);
	FileData createFolder(String path);

}
