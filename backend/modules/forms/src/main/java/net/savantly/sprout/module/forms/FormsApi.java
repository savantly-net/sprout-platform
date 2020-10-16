package net.savantly.sprout.module.forms;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.Builder;
import net.savantly.sprout.module.forms.domain.data.FormDataDto;
import net.savantly.sprout.module.forms.domain.definition.FormDefinitionDto;

@Builder
@RestController
@RequestMapping("/api/savantly-forms")
public class FormsApi {

	private final FormService service;


	/*****************************/
	/***** Form Definition *******/
	/*****************************/
	
	@GetMapping(value = {"/form", "/form/"})
	public Page<FormDefinitionDto> getFormDefinitions(Pageable pageable) {
		return service.findAllFormDefinitions(pageable);
	}
	
	@GetMapping("/form/{id}")
	public FormDefinitionDto getFormDefinitionById(@PathVariable String id) {
		return service.getFormDefinitionById(id);
	}
	
	@PostMapping("/form")
	public FormDefinitionDto createFormDefinition(@RequestBody FormDefinitionDto dto) {
		return service.createFormDefinition(dto);
	}
	
	@DeleteMapping("/form/{id}")
	public void deleteFormDefinition(@PathVariable String id) {
		service.deleteFormDefinitionById(id);
	}


	/*****************************/
	/***** Form Data *******/
	/*****************************/
	
	@GetMapping(value = {"/data", "/data/"})
	public Page<FormDataDto> getFormData(Pageable pageable) {
		return service.findAllFormData(pageable);
	}
	
	@GetMapping("/data/{id}")
	public FormDataDto getFormDataById(@PathVariable String id) {
		return service.getFormDataById(id);
	}
	
	@PostMapping("/data")
	public FormDataDto createFormData(@RequestBody FormDataDto dto) {
		return service.createFormData(dto);
	}
	
	@DeleteMapping("/data/{id}")
	public void deleteFormData(@PathVariable String id) {
		service.deleteFormDefinitionById(id);
	}
	
}
