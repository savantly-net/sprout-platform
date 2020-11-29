package net.savantly.sprout.starter.security.permissions;

import java.util.ArrayList;
import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BootstrapPermission {
	private String role;
	private List<String> permissions = new ArrayList<>();
	public BootstrapPermission() {}
	public BootstrapPermission(String role, List<String> permissions) {
		this.role = role;
		this.permissions = permissions;
	}
}