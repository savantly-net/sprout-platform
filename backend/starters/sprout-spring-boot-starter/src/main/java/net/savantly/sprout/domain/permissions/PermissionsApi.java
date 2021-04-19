package net.savantly.sprout.domain.permissions;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.zalando.problem.Problem;
import org.zalando.problem.Status;

import net.savantly.sprout.core.domain.privilege.Privilege;
import net.savantly.sprout.core.domain.privilege.PrivilegeRepository;
import net.savantly.sprout.core.domain.role.Role;
import net.savantly.sprout.core.domain.role.RoleRepository;

@RequestMapping("/api/permissions")
@RestController
@Transactional
public class PermissionsApi {

	private final RoleRepository roleRepo;
	private final PrivilegeRepository privilegeRepo;

	public PermissionsApi(RoleRepository roleRepo, PrivilegeRepository privilegeRepo) {
		this.roleRepo = roleRepo;
		this.privilegeRepo = privilegeRepo;
	}

	@GetMapping("/role")
	public ResponseEntity<List<Role>> getRoles() {
		return ResponseEntity.ok(roleRepo.findAll());
	}

	@PutMapping("/role")
	@PreAuthorize("hasAuthority('ADMIN')")
	public ResponseEntity<Role> updateRole(@RequestBody PermissionUpdateDto dto) {
		Role role = roleOrThrow(dto.getRole());
		Set<Privilege> privileges = dto.getPrivileges().stream().map(s -> privilegeOrThrow(s)).collect(Collectors.toSet());
		role.setPrivileges(privileges);
		return ResponseEntity.ok(roleRepo.save(role));
	}
	
	@GetMapping("/privilege")
	public ResponseEntity<Iterable<Privilege>> getPrivileges() {
		return ResponseEntity.ok(privilegeRepo.findAll());
	}

	@PostMapping("/role/{name}")
	@PreAuthorize("hasAuthority('ADMIN')")
	public ResponseEntity<Role> createRole(@PathVariable("name") String name) {
		return ResponseEntity.ok(roleRepo.save(new Role().setName(name)));
	}

	@DeleteMapping("/role/{name}")
	@PreAuthorize("hasAuthority('ADMIN')")
	public ResponseEntity<Void> deleteRole(@PathVariable("name") String name) {
		Role role = roleOrThrow(name);
		roleRepo.delete(role);
		return ResponseEntity.ok().build();
	}

	@PostMapping("/role/{name}/{privilege}")
	@PreAuthorize("hasAuthority('ADMIN')")
	public ResponseEntity<Role> addPrivilegeToRole(@PathVariable("name") String name,
			@PathVariable("privilege") String privilege) {
		Role role = roleOrThrow(name);
		Privilege privilegeEntity = privilegeOrThrow(privilege);
		role.getPrivileges().add(privilegeEntity);
		return ResponseEntity.ok(role);
	}

	@DeleteMapping("/role/{name}/{privilege}")
	@PreAuthorize("hasAuthority('ADMIN')")
	public ResponseEntity<Role> removePrivilegeFromRole(@PathVariable("name") String name,
			@PathVariable("privilege") String privilege) {
		Role role = roleOrThrow(name);
		Privilege privilegeEntity = privilegeOrThrow(privilege);
		role.getPrivileges().remove(privilegeEntity);
		return ResponseEntity.ok(role);
	}
	
	private Role roleOrThrow(String name) {
		return roleRepo.findByName(name).stream().findFirst().orElseThrow(
				() -> Problem.builder().withDetail("role not found").withStatus(Status.BAD_REQUEST).build());
	}

	private Privilege privilegeOrThrow(String name) {
		return privilegeRepo.findByName(name).stream().findFirst().orElseThrow(
				() -> Problem.builder().withDetail("privilege not found").withStatus(Status.BAD_REQUEST).build());
	}

}
