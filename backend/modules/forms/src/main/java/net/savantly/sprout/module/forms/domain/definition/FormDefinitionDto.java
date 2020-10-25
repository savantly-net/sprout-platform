package net.savantly.sprout.module.forms.domain.definition;

import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.HashMap;
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
	
	@JsonProperty("type")
	private String formType;
	
	private String title;
	private String name;
	private String path;
	private String display;
	private ZonedDateTime created;
	private ZonedDateTime modified;
	
	
	private List<Map<String, Object>> components = new ArrayList<Map<String,Object>>();
	
	private List<String> tags = new ArrayList<>();

	private Map<String, Object> settings = new HashMap<String,Object>();

}
