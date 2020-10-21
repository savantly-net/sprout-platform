package net.savantly.sprout.module.forms.domain.definition;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

@Getter @Setter
@Accessors(chain = true)
public class FormDefinitionDto {
	
	@JsonProperty("_id")
	private String id;
	private String title;
	private String display;
	private String path;
	
	@JsonProperty("type")
	private String formType;
	private List<Map<String, Object>> components = new ArrayList<Map<String,Object>>();

}
