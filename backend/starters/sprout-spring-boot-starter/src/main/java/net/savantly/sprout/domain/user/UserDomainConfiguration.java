package net.savantly.sprout.domain.user;

import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import net.savantly.sprout.core.domain.user.repository.UserRepository;
import net.savantly.sprout.core.security.users.SproutUserService;
import net.savantly.sprout.domain.user.admin.UserAdminApi;
import net.savantly.sprout.domain.user.admin.UserAdminServiceImpl;
import net.savantly.sprout.domain.user.search.UserSearchApi;

@Configuration
public class UserDomainConfiguration {
    
    @Bean
	@ConditionalOnMissingBean
    public UserAdminApi userAdminApi(UserAdminServiceImpl userAdminService) {
        return new UserAdminApi(userAdminService);
    }

    @Bean
	@ConditionalOnMissingBean
    public UserAdminServiceImpl userAdminService(SproutUserService userService, UserRepository userRepo) {
        return new UserAdminServiceImpl(userService, userRepo);
    }

    @Bean
	public UserSearchApi userSearchApi(UserRepository repo) {
		return new UserSearchApi(repo);
	}
}
