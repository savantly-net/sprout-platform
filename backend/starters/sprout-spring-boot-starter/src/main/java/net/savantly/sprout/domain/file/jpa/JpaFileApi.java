package net.savantly.sprout.domain.file.jpa;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/files/download")
public class JpaFileApi {

	private JpaFileProvider provider;

	public JpaFileApi(JpaFileProvider provider) {
		this.provider = provider;
	}

	@GetMapping("/{id}")
	public ResponseEntity<byte[]> downloadFile(@PathVariable("id") String id) {
		JpaFile file = provider.getFile(id);
		String contentDisposition = String.format("attachment; filename=%s", file.getName());
		return ResponseEntity.ok().header("Content-Disposition", contentDisposition)
				.contentType(MediaType.APPLICATION_OCTET_STREAM).body(file.getBytes());
	}

}
