package net.savantly.sprout.module.forms.formio;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

@Getter @Setter
@Accessors(chain = true)
public class FormioLogin {

	private String email;
	private String password;
}
