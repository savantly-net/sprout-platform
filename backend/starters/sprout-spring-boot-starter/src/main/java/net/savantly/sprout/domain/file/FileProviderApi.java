package net.savantly.sprout.domain.file;

import java.io.IOException;
import java.util.List;

import javax.validation.constraints.NotNull;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/files")
public class FileProviderApi {

	private FileProvider provider;

	public FileProviderApi(FileProvider provider) {
		this.provider = provider;
	}

	@GetMapping(path = { "/list", "/list/{path:.*}" })
	public ResponseEntity<List<FileData>> listFiles(@PathVariable(value = "path", required = false) String path) {
		return ResponseEntity.ok(this.provider.getFilesByFolder(path));
	}

	@PostMapping(path = {"/create"})
	public ResponseEntity<FileData> createFile(@RequestBody FileDataRequest request) {
		return ResponseEntity.ok(this.provider.createFile(request));
	}

	@PostMapping(path = { "/upload"}, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<FileData> uploadFile(
			@NotNull @RequestPart("file") MultipartFile file, @RequestPart("metaData") FileDataRequest request) throws IOException {
		FileData response = this.provider.storeFile(request, file.getInputStream());
		return ResponseEntity.ok(response);
	}
}
