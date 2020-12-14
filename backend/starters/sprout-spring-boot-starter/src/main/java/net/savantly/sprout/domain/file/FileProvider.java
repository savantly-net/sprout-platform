package net.savantly.sprout.domain.file;

import org.springframework.web.multipart.MultipartFile;

public interface FileProvider {
	
	FileDataResponse getFilesByFolder(String path);
	FileData storeFile(FileDataRequest request, MultipartFile file);
	FileData createFile(FileDataRequest request);
	void deleteFile(String id);

}
