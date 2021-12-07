package net.savantly.sprout.core.domain.user;

import java.util.ArrayList;
import java.util.Collection;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

@Accessors(chain = true)
@Getter @Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class UserUpdateDto {

	private String username;
	private String firstName;
	private String lastName;
	private Collection<String> roles = new ArrayList<>();
}
