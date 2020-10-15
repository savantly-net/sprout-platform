package net.savantly.sprout.module.forms.domain.data;

import java.util.Map;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

@Getter @Setter
@Accessors(chain = true)
public class FormDataDto {

	private String id;
	private String formDefinitionId;
	private Map<String, Object> data;
}
