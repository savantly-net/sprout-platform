package net.savantly.sprout.module.forms.formio;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

@Getter @Setter
@Accessors(chain = true)
public class ProjectCreateRequest {
	
	private String title;
	private String name;
	private String description;
	private String template;

}
