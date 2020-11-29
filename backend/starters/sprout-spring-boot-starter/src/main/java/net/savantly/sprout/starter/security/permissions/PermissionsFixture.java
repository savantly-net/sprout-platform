package net.savantly.sprout.starter.security.permissions;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.dataformat.yaml.YAMLFactory;

import net.savantly.spring.fixture.AbstractBaseFixture;
import net.savantly.spring.fixture.Fixture;
import net.savantly.sprout.autoconfigure.properties.SproutConfigurationProperties;
import net.savantly.sprout.core.domain.privilege.Privilege;
import net.savantly.sprout.core.domain.privilege.PrivilegeRepository;
import net.savantly.sprout.core.domain.role.Role;
import net.savantly.sprout.core.domain.role.RoleRepository;

@Transactional
public class PermissionsFixture extends AbstractBaseFixture<Role, RoleRepository> {
	private static final Logger log = LoggerFactory.getLogger(PermissionsFixture.class);
	
	@Value("classpath:/META-INF/config/permissions.yml")
	private Resource permissionsResource;
	private final SproutConfigurationProperties configProps;
	private final RoleRepository roleRepo;
	private final PrivilegeRepository privilegeRepo;

	public PermissionsFixture(RoleRepository roleRepo, PrivilegeRepository privilegeRepo, SproutConfigurationProperties configProps) {
		super(roleRepo);
		this.roleRepo = roleRepo;
		this.privilegeRepo = privilegeRepo;
		this.configProps = configProps;
	}

	@Override
	public void addEntities(List<Role> entityList) {
		if (configProps.getSecurity().getAuthorization().isApplyDefaultPermissions()) {
			final ObjectMapper mapper = new ObjectMapper(new YAMLFactory());
			try {
				final PermissionsHolder holder = mapper.readValue(permissionsResource.getInputStream(), PermissionsHolder.class);
				holder.getAuthorities().forEach(a -> {
					addIfMissing(a);
				});
			} catch (IOException e) {
				log.error("Failed to apply default permissions", e);
			}
		}
	}

	private void addIfMissing(BootstrapPermission a) {
		log.info("ensuring role: {} exists with permissions: {}", a.getRole(), a.getPermissions());
		Role role = addRoleIfMissing(a.getRole());
		Set<Privilege> privileges = a.getPermissions().stream().map(p -> addPrivilegeIfMissing(p)).collect(Collectors.toSet());
		role.getPrivileges().addAll(privileges);
		roleRepo.save(role);
	}
	
	private Privilege addPrivilegeIfMissing(String name) {
		Optional<Privilege> maybe = privilegeRepo.findByName(name).stream().findFirst();
		if (maybe.isPresent()) {
			return maybe.get();
		} else {
			return privilegeRepo.save(new Privilege().setName(name));
		}
	}
	
	private Role addRoleIfMissing(String name) {
		Optional<Role> maybe = roleRepo.findByName(name).stream().findFirst();
		if (maybe.isPresent()) {
			return maybe.get();
		} else {
			return roleRepo.save(new Role().setName(name));
		}
	}

	@Override
	public void addDependencies(List<Fixture<?>> dependencies) {
		// TODO Auto-generated method stub
		
	}
	

}
