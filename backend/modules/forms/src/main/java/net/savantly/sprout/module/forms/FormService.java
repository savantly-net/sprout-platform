package net.savantly.sprout.module.forms;

import java.util.List;
import java.util.Map;
import java.util.Objects;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.type.CollectionType;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import net.savantly.sprout.module.forms.domain.data.FormData;
import net.savantly.sprout.module.forms.domain.data.FormDataDto;
import net.savantly.sprout.module.forms.domain.data.FormDataRepository;
import net.savantly.sprout.module.forms.domain.definition.FormDefinition;
import net.savantly.sprout.module.forms.domain.definition.FormDefinitionDto;
import net.savantly.sprout.module.forms.domain.definition.FormDefinitionRepository;
import net.savantly.sprout.module.forms.exception.FormConversionException;

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
		return fromEntity(this.formDefinitionRepository.findByIdItemId(id));
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
		return fromEntity(this.formDataRepository.findByIdItemId(id));
	}

	public void deleteFormDataById(String id) {
		this.formDataRepository.deleteByIdItemId(id);
	}
	
	public Page<FormDataDto> findAllFormData(Pageable pageable) {
		return this.formDataRepository.findAll(pageable).map(this::fromEntity);
	}

	public FormDataDto createFormData(FormDataDto dto) {
		FormData entity = this.formDataRepository.save(fromDto(dto));
		return fromEntity(entity);
	}
	

	/*****************************/
	/*****   Converters    *******/
	/*****************************/
	
	FormDataDto fromEntity(FormData formData) {
		try {
			return new FormDataDto()
					.setId(Objects.nonNull(formData.getId()) ? formData.getId().getItemId() : null)
					.setData(mapper.readValue(formData.getData(), mapRef))
					.setFormDefinitionId(formData.getFormDefinitionId());
		} catch (JsonProcessingException e) {
			log.warn("failed to deserialize form data: {}", formData.getData());
			return null;
		}
	}
	
	FormDefinitionDto fromEntity(FormDefinition formDefinition) {
        CollectionType mapCollectionType = mapper.getTypeFactory().constructCollectionType(List.class, Map.class);
		try {
			return new FormDefinitionDto()
					.setId(Objects.nonNull(formDefinition.getId()) ? formDefinition.getId().getItemId() : null)
					.setComponents(mapper.readValue(formDefinition.getComponents(), mapCollectionType))
					.setTitle(formDefinition.getTitle());
		} catch (JsonProcessingException e) {
			log.warn("failed to deserialize form definition: {}", formDefinition.getComponents());
			return null;
		}
	}
	
	FormData fromDto(FormDataDto formDataDto) {
		try {
			return new FormData()
					.setData(mapper.writeValueAsString(formDataDto.getData()));
		} catch (JsonProcessingException e) {
			throw new FormConversionException(e);
		}
	}
	
	FormDefinition fromDto(FormDefinitionDto formDefinitionDto) {
		try {
			return new FormDefinition().setTitle(formDefinitionDto.getTitle())
					.setComponents(mapper.writeValueAsString(formDefinitionDto.getComponents()));
		} catch (JsonProcessingException e) {
			throw new FormConversionException(e);
		}
	}
	

}
