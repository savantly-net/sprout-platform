package net.savantly.sprout.module.forms.domain.definition;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

@Getter @Setter
@Accessors(chain = true)
public class FormDefinitionDto {
	
	private String id;
	private String title;
	private List<Map<String, Object>> components = new ArrayList<Map<String,Object>>();

}
