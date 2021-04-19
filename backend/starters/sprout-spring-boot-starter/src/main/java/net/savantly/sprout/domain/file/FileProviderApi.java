package net.savantly.sprout.domain.file;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.validation.constraints.NotNull;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.HandlerMapping;

@RestController
@RequestMapping("/api/files")
public class FileProviderApi {

	private FileProvider provider;

	public FileProviderApi(FileProvider provider) {
		this.provider = provider;
	}

	@PreAuthorize("hasAuthority('FILES_READ')")
	@GetMapping(path = { "/list", "/list/**" })
	public ResponseEntity<FileDataResponse> listFiles(HttpServletRequest request) {
		String pathPrefix = "/list";
		String requestedUri = (String) request.getAttribute(HandlerMapping.PATH_WITHIN_HANDLER_MAPPING_ATTRIBUTE);
		int beginIndex = requestedUri.indexOf(pathPrefix) + pathPrefix.length();
		int endIndex = requestedUri.length();
		String path = requestedUri.substring(beginIndex, endIndex);
		return ResponseEntity.ok(this.provider.getFilesByFolder(path));
	}

	@PreAuthorize("hasAuthority('FILES_DELETE')")
	@DeleteMapping("/list/**")
	public void deleteFile(HttpServletRequest request) {
		String pathPrefix = "/list/";
		String requestedUri = (String) request.getAttribute(HandlerMapping.PATH_WITHIN_HANDLER_MAPPING_ATTRIBUTE);
		int beginIndex = requestedUri.indexOf(pathPrefix) + pathPrefix.length();
		int endIndex = requestedUri.length();
		String path = requestedUri.substring(beginIndex, endIndex);
		this.provider.deleteFile(path);
	}

	@PreAuthorize("hasAuthority('FILES_CREATE')")
	@PostMapping(path = { "/create" })
	public ResponseEntity<FileData> createFile(@RequestBody FileDataRequest request) {
		return ResponseEntity.ok(this.provider.createFile(request));
	}

	@PreAuthorize("hasAuthority('FILES_CREATE')")
	@PostMapping(path = { "/upload" }, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<FileData> uploadFile(@NotNull @RequestPart("file") MultipartFile file,
			@RequestPart("metaData") FileDataRequest request) throws IOException {
		FileData response = this.provider.storeFile(request, file);
		return ResponseEntity.ok(response);
	}
	
}
