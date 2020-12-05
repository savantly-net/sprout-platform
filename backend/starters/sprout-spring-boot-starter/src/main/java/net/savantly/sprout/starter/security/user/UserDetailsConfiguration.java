package net.savantly.sprout.starter.security.user;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import net.savantly.authorization.service.PermissionProvider;
import net.savantly.sprout.core.domain.emailAddress.repository.EmailAddressRepository;
import net.savantly.sprout.core.domain.role.RoleRepository;
import net.savantly.sprout.core.domain.user.repository.UserPersistenceListener;
import net.savantly.sprout.core.domain.user.repository.UserRepository;
import net.savantly.sprout.core.security.users.SproutPasswordEncoder;
import net.savantly.sprout.core.security.users.SproutUserService;
import net.savantly.sprout.core.security.users.SproutUserServiceImpl;

@Configuration
public class UserDetailsConfiguration {

	@Bean({"userDetailsService"})
	public SproutUserService sproutUserDetailsService(UserRepository userRepository,
			EmailAddressRepository emailAddressRepository, PermissionProvider permissionProvider,
			RoleRepository roleRepository, PasswordEncoder passwordEncoder) {

		return new SproutUserServiceImpl(userRepository, emailAddressRepository,
				roleRepository, passwordEncoder);
	}
	
	@Bean
	public DefaultUserDetailsConfigurer userDetailsConfigurer(SproutUserService userService) {
		return new DefaultUserDetailsConfigurer(userService);
	}

	@Bean
	public SproutPasswordEncoder sproutPasswordEncoder() {
		return new SproutPasswordEncoder();
	}

	@Bean
	public UserPersistenceListener userPersistenceListener(PasswordEncoder pwEncoder) {
		return new UserPersistenceListener(pwEncoder);
	}
}
