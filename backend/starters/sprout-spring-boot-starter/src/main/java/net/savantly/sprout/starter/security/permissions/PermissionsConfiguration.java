package net.savantly.sprout.starter.security.permissions;

import java.util.Set;

import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import net.savantly.authorization.service.PermissionProvider;
import net.savantly.sprout.autoconfigure.properties.SproutConfigurationProperties;
import net.savantly.sprout.core.domain.privilege.PrivilegeRepository;
import net.savantly.sprout.core.domain.role.RoleRepository;
import net.savantly.sprout.core.security.permissions.DelegatingPermissionEvaluator;
import net.savantly.sprout.core.security.permissions.SproutPermissionEvaluator;
import net.savantly.sprout.core.security.permissions.SproutPermissionRegistry;

@Configuration
public class PermissionsConfiguration {

	@Bean
	@ConditionalOnMissingBean(PermissionProvider.class)
	public PermissionProvider permissionProvider(RoleRepository roleRepository) {
		return new DefaultPermissionProvider(roleRepository);
	}

	@Bean
	public PermissionsFixture permissionsFixture(RoleRepository roleRepo, PrivilegeRepository privilegeRepo,
			SproutConfigurationProperties configProps) {
		return new PermissionsFixture(roleRepo, privilegeRepo, configProps);
	}
	
	@Bean
	public DelegatingPermissionEvaluator defaultPermissionEvaluator(SproutPermissionRegistry registry) {
		return new DelegatingPermissionEvaluator(registry);
	}
	
	@Bean
	public SproutPermissionRegistry defaultPermissionEvaluatorRegistry(Set<SproutPermissionEvaluator> evaluatorBeans) {
		return new SproutPermissionRegistry(evaluatorBeans);
	}
}
