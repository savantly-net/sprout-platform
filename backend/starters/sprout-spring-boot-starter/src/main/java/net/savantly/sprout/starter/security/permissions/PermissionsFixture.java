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
import net.savantly.sprout.core.domain.privilege.PrivilegeEntity;
import net.savantly.sprout.core.domain.privilege.PrivilegeRepository;
import net.savantly.sprout.core.domain.role.RoleEntity;
import net.savantly.sprout.core.domain.role.RoleRepository;
import net.savantly.sprout.core.tenancy.TenantContext;

@Transactional
public class PermissionsFixture extends AbstractBaseFixture<RoleEntity, RoleRepository> {
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
	public void addEntities(List<RoleEntity> entityList) {
		if (configProps.getSecurity().getAuthorization().isApplyDefaultPermissions()) {
			final ObjectMapper mapper = new ObjectMapper(new YAMLFactory());
			try {
				final PermissionsHolder holder = mapper.readValue(permissionsResource.getInputStream(), PermissionsHolder.class);
				holder.getPermissions().forEach(a -> {
					addIfMissing(a);
				});
			} catch (IOException e) {
				throw new RuntimeException("Failed to apply default permissions", e);
			}
		}
		try {
			configProps.getSecurity().getAuthorization().getBootstrapPermissions().forEach(p -> {
				addIfMissing(p);
			});
		} catch (Exception e) {
			throw new RuntimeException("Failed to apply bootstrap permissions", e);
		}
	}

	private void addIfMissing(BootstrapPermission a) {
		log.info("ensuring role: {} exists with permissions: {}", a.getRole(), a.getPrivileges());
		RoleEntity role = addRoleIfMissing(a.getRole());
		Set<PrivilegeEntity> privileges = a.getPrivileges().stream().map(p -> addPrivilegeIfMissing(p)).collect(Collectors.toSet());
		role.getPrivileges().addAll(privileges);
		roleRepo.save(role);
	}
	
	private PrivilegeEntity addPrivilegeIfMissing(String name) {
		Optional<PrivilegeEntity> maybe = privilegeRepo.findByNameAndTenantId(name, TenantContext.getCurrentTenant()).stream().findFirst();
		if (maybe.isPresent()) {
			return maybe.get();
		} else {
			return privilegeRepo.save(new PrivilegeEntity().setName(name));
		}
	}
	
	private RoleEntity addRoleIfMissing(String name) {
		Optional<RoleEntity> maybe = roleRepo.findByName(name).stream().findFirst();
		if (maybe.isPresent()) {
			return maybe.get();
		} else {
			return roleRepo.save(new RoleEntity().setName(name));
		}
	}

	@Override
	public void addDependencies(List<Fixture<?>> dependencies) {
		// TODO Auto-generated method stub
		
	}
	

}
