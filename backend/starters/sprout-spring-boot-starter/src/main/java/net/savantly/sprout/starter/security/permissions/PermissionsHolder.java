package net.savantly.sprout.starter.security.permissions;

import java.util.ArrayList;
import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PermissionsHolder {

	private List<BootstrapPermission> permissions = new ArrayList<>();
}
