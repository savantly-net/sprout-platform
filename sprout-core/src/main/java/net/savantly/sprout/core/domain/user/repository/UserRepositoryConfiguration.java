package net.savantly.sprout.core.domain.user.repository;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;

import net.savantly.sprout.core.domain.user.SproutUser;

@Configuration
public class UserRepositoryConfiguration {

    public UserRepositoryConfiguration(RepositoryRestConfiguration config){
        config.exposeIdsFor(SproutUser.class);
    }
    
}
