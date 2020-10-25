package net.savantly.sprout.module.forms;

import java.util.List;
import java.util.Map;
import java.util.Objects;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.type.CollectionType;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import net.savantly.sprout.core.tenancy.TenantedPrimaryKey;
import net.savantly.sprout.module.forms.domain.data.FormData;
import net.savantly.sprout.module.forms.domain.data.FormDataDto;
import net.savantly.sprout.module.forms.domain.data.FormDataRepository;
import net.savantly.sprout.module.forms.domain.definition.FormDefinition;
import net.savantly.sprout.module.forms.domain.definition.FormDefinitionDto;
import net.savantly.sprout.module.forms.domain.definition.FormDefinitionRepository;
import net.savantly.sprout.module.forms.domain.definition.FormDisplayType;
import net.savantly.sprout.module.forms.domain.definition.FormType;
import net.savantly.sprout.module.forms.exception.FormConversionException;
import net.savantly.sprout.starter.problem.EntityNotFoundProblem;

@Builder
@Getter @Setter
public class FormService {
	
	private final Logger log = LoggerFactory.getLogger(FormService.class);
	private final FormDefinitionRepository formDefinitionRepository;
	private final FormDataRepository formDataRepository;
	private final ObjectMapper mapper;
	
	private final TypeReference<Map<String,Object>> mapRef = new TypeReference<Map<String,Object>>() {};

	/*****************************/
	/***** Form Definition *******/
	/*****************************/
	
	/**
	 * Get a single form definition by id.  
	 * It's still filtered by the current tenant
	 * @param id
	 * @return {@linkplain FormDefinitionDto}
	 */
	public FormDefinitionDto getFormDefinitionById(String id) {
		FormDefinition entity = this.formDefinitionRepository.findByIdItemId(id);
		if (Objects.isNull(entity)) {
			throw new EntityNotFoundProblem("FormDefinition", id);
		}
		return fromEntity(entity);
	}
	
	public Page<FormDefinitionDto> getBySpecification(Specification<FormDefinition> specification, Pageable pageable) {
		return this.formDefinitionRepository.findAll(specification, pageable).map(this::fromEntity);
	}
	
	public FormDefinitionDto getFormDefinitionByPath(String path) {
		List<FormDefinition> entities = this.formDefinitionRepository.findByPath(path);
		// there should only be one, since there is a constraint, unless the tenant filter is not being used
		if(entities.size() == 0) {
			throw new ResourceNotFoundException("Could not find a form using the path:" + path);
		}
		return fromEntity(entities.get(0));
	}
	
	public FormDefinitionDto updateFormDefinitionById(String id, FormDefinitionDto dto) {
		FormDefinition entity = this.formDefinitionRepository.findByIdItemId(id);
		FormDefinition updated = fromDto(dto);
		entity.setComponents(updated.getComponents())
			.setDisplay(updated.getDisplay())
			.setFormType(updated.getFormType())
			.setPath(updated.getPath())
			.setTitle(updated.getTitle());
		this.formDefinitionRepository.save(entity);
		return fromEntity(entity);
	}

	public void deleteFormDefinitionById(String id) {
		this.formDefinitionRepository.deleteByIdItemId(id);
	}
	
	public Page<FormDefinitionDto> findAllFormDefinitions(Pageable pageable) {
		return this.formDefinitionRepository.findAll(pageable).map(this::fromEntity);
	}
	
	public FormDefinitionDto createFormDefinition(FormDefinitionDto dto) {
		FormDefinition entity = this.formDefinitionRepository.save(fromDto(dto));
		return fromEntity(entity);
	}

	/*****************************/
	/*****   Form Data     *******/
	/*****************************/

	/**
	 * Get a single form data by id.  
	 * It's still filtered by the current tenant
	 * @param id
	 * @return
	 */
	public FormDataDto getFormDataById(String id) {
		FormData entity = this.formDataRepository.findByIdItemId(id);
		if (Objects.isNull(entity)) {
			throw new EntityNotFoundProblem("FormData", id);
		}
		return fromEntity(entity);
	}

	public void deleteFormDataById(String id) {
		this.formDataRepository.deleteByIdItemId(id);
	}
	
	public Page<FormDataDto> findAllFormData(Pageable pageable) {
		return this.formDataRepository.findAll(pageable).map(this::fromEntity);
	}

	public Page<FormDataDto> findAllFormDataByFormId(String formId, Pageable pageable) {
		return this.formDataRepository.findByFormDefinitionId(formId, pageable).map(this::fromEntity);
	}

	public FormDataDto createFormData(FormDataDto dto) {
		FormData entity = this.formDataRepository.save(fromDto(dto));
		return fromEntity(entity);
	}
	
	public FormDataDto updateFormData(FormDataDto dto) {
		FormData entity = this.formDataRepository.findByIdItemId(dto.getId());
		FormData converted = fromDto(dto);
		entity.setData(converted.getData());
		entity.setMetadata(converted.getMetadata());
		this.formDataRepository.save(entity);
		return fromEntity(entity);
	}

	public Page<FormDataDto> findFormDataByFormPath(String formPath, Pageable pageable) {
		List<FormDefinition> entities = this.formDefinitionRepository.findByPath(formPath);
		if(entities.size() == 0) {
			throw new ResourceNotFoundException("Could not find a form using the path:" + formPath);
		}
		FormDefinition formDefinition = entities.get(0);
		return this.formDataRepository.findByFormDefinitionId(formDefinition.getId().getItemId(), pageable).map(this::fromEntity);
	}
	

	/*****************************/
	/*****   Converters    *******/
	/*****************************/
	
	FormDataDto fromEntity(FormData formData) {
		try {
			return new FormDataDto()
					.setId(Objects.nonNull(formData.getId()) ? formData.getId().getItemId() : null)
					.setData(mapper.readValue(formData.getData(), mapRef))
					.setMetadata(mapper.readValue(formData.getMetadata(), mapRef))
					.setFormId(formData.getFormDefinitionId());
		} catch (JsonProcessingException e) {
			log.warn("failed to deserialize form data: {}", formData.getData());
			return null;
		}
	}
	
	@SuppressWarnings("unchecked")
	FormDefinitionDto fromEntity(FormDefinition formDefinition) {
        CollectionType mapCollectionType = mapper.getTypeFactory().constructCollectionType(List.class, Map.class);
		try {
			return new FormDefinitionDto()
					.setId(Objects.nonNull(formDefinition.getId()) ? formDefinition.getId().getItemId() : null)
					.setComponents(mapper.readValue(formDefinition.getComponents(), mapCollectionType))
					.setSettings(mapper.readValue(formDefinition.getSettings(), Map.class))
					.setTitle(formDefinition.getTitle())
					.setDisplay(formDefinition.getDisplay().name())
					.setFormType(formDefinition.getFormType().name())
					.setPath(formDefinition.getPath())
					.setName(formDefinition.getName())
					.setCreated(formDefinition.getCreatedDate().orElse(null))
					.setModified(formDefinition.getLastModifiedDate().orElse(null));
		} catch (JsonProcessingException e) {
			log.warn("failed to deserialize form definition: {}", formDefinition.getComponents());
			return null;
		}
	}
	
	FormData fromDto(FormDataDto formDataDto) {
		try {
			TenantedPrimaryKey tid = new TenantedPrimaryKey();
			tid.setItemId(formDataDto.getId());
			FormData entity = new FormData()
					.setData(mapper.writeValueAsString(formDataDto.getData()))
					.setMetadata(mapper.writeValueAsString(formDataDto.getMetadata()))
					.setFormDefinitionId(formDataDto.getFormId());
			entity.setId(tid);
			return entity;
		} catch (JsonProcessingException e) {
			throw new FormConversionException(e);
		}
	}
	
	FormDefinition fromDto(FormDefinitionDto formDefinitionDto) {
		try {
			return new FormDefinition()
					.setTitle(formDefinitionDto.getTitle())
					.setDisplay(coerceDisplayType(formDefinitionDto.getDisplay()))
					.setName(formDefinitionDto.getName())
					.setFormType(coerceFormType(formDefinitionDto.getFormType()))
					.setPath(formDefinitionDto.getPath())
					.setComponents(mapper.writeValueAsString(formDefinitionDto.getComponents()))
					.setSettings(mapper.writeValueAsString(formDefinitionDto.getSettings()));
		} catch (JsonProcessingException e) {
			throw new FormConversionException(e);
		}
	}
	
	private FormDisplayType coerceDisplayType(String displayType) {
		if(Objects.nonNull(displayType) && !displayType.isEmpty()) {
			return FormDisplayType.valueOf(displayType);
		} else {
			return FormDisplayType.form;
		}
	}
	
	private FormType coerceFormType(String formType) {
		if(Objects.nonNull(formType) && !formType.isEmpty()) {
			return FormType.valueOf(formType);
		} else {
			return FormType.form;
		}
	}

}
