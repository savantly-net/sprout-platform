package net.savantly.sprout.starter.security.permissions;

import java.util.ArrayList;
import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BootstrapPermission {
	private String role;
	private List<String> privileges = new ArrayList<>();
	public BootstrapPermission() {}
	public BootstrapPermission(String role, List<String> privileges) {
		this.role = role;
		this.privileges = privileges;
	}
}