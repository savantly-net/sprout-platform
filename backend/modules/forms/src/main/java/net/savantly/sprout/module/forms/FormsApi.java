package net.savantly.sprout.module.forms;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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
	
	@PutMapping("/form/{id}")
	public FormDefinitionDto updateFormDefinitionById(@PathVariable String id, @RequestBody FormDefinitionDto dto) {
		return service.updateFormDefinitionById(id, dto);
	}
	
	@DeleteMapping("/form/{id}")
	public void deleteFormDefinition(@PathVariable String id) {
		service.deleteFormDefinitionById(id);
	}
	
	@GetMapping("/form/{id}/submission")
	public Page<FormDataDto> getFormDataByFormId(@PathVariable String id, Pageable pageable) {
		return service.findAllFormDataByFormId(id, pageable);
	}


	/*****************************/
	/***** Overall Form Data *****/
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
	

	/*****************************/
	/******* Form Path ***********/
	/*****************************/
	
	@GetMapping("/forms/{formPath}")
	public FormDefinitionDto getFormByFormPath(@PathVariable String formPath) {
		return service.getFormDefinitionByPath(formPath);
	}

	@PostMapping("/forms/{formPath}")
	public FormDataDto createFormData(@PathVariable String formPath, @RequestBody FormDataDto dto) {
		FormDefinitionDto formDefinition = service.getFormDefinitionByPath(formPath);
		dto.setFormId(formDefinition.getId());
		return service.createFormData(dto);
	}
	
	@GetMapping(value = {"/forms/{formPath}/submission"})
	public Page<FormDataDto> getDataByFormPath(@PathVariable String formPath, Pageable pageable) {
		return service.findFormDataByFormPath(formPath, pageable);
	}
	
	@GetMapping("/forms/{formPath}/submission/{id}")
	public FormDataDto getFormDataByPathAndId(@PathVariable String id) {
		return service.getFormDataById(id);
	}
	
	@PutMapping("/forms/{formPath}/submission/{id}")
	public FormDataDto updateFormData(@PathVariable String id, @RequestBody FormDataDto dto) {
		return service.updateFormData(dto);
	}
	
}
