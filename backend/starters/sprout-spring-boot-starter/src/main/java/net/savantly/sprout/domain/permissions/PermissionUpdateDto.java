package net.savantly.sprout.domain.permissions;

import java.util.ArrayList;
import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PermissionUpdateDto {
	
	private String role;
	private List<String> privileges = new ArrayList<>();

}
