package net.savantly.sprout.model.user;

import java.util.Set;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

@Accessors(chain = true)
public class UserDto {
	
	@Getter @Setter
	private String name;
	
	@Getter @Setter
	private Set<String> roles;

}
