package net.savantly.sprout.domain.file;

import java.io.InputStream;
import java.util.List;

public interface FileProvider {
	
	List<FileData> getFilesByFolder(String path);
	FileData storeFile(FileDataRequest request, InputStream inputStream);
	FileData createFile(FileDataRequest request);

}
