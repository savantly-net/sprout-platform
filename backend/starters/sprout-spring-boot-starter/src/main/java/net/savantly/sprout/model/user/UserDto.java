package net.savantly.sprout.model.user;

import java.util.HashSet;
import java.util.Set;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

@Getter @Setter
@Accessors(chain = true)
public class UserDto {
	
	private String name;
	private String logoutUrl;
	private Set<String> authorities = new HashSet<String>();

}
