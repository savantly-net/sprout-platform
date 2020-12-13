package net.savantly.sprout.domain.file.jpa;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
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

	@RequestMapping("/{id}")
	public ResponseEntity<byte[]> downloadFile(@PathVariable("id") String id) {
		JpaFile file = provider.getFile(id);
		return ResponseEntity.ok().contentType(MediaType.APPLICATION_OCTET_STREAM).body(file.getBytes());
	}

}
