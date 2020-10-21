package net.savantly.sprout.module.forms.domain.data;

import java.util.Map;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

@Getter @Setter
@Accessors(chain = true)
public class FormDataDto {

	@JsonProperty("_id")
	private String id;
	private String formId;
	private Map<String, Object> data;
	private Map<String, Object> metadata;
}
