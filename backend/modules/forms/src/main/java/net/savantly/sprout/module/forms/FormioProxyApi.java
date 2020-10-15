package net.savantly.sprout.module.forms;

import java.util.Map;
import java.util.Objects;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.Builder;
import net.savantly.sprout.module.forms.formio.ProjectCreateRequest;

@Builder
@RestController
@RequestMapping("/api/savantly-forms")
public class FormioProxyApi {



	@GetMapping(value = {"form"})
	public ResponseEntity<Map> getFormio(@PathVariable(required = false) String url){
		if(Objects.isNull(url)) {
			return ResponseEntity.ok(null);
		}
		return null;
	}

	@PostMapping("/project")
	public ResponseEntity<Map> createProject(@RequestBody ProjectCreateRequest request){
		return null;
	}
}
