package net.savantly.sprout.core.domain.emailAddress.repository;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;

import net.savantly.sprout.core.domain.emailAddress.EmailAddress;

@Configuration
public class EmailAddressRepositoryConfiguration {

    public EmailAddressRepositoryConfiguration(RepositoryRestConfiguration config){
        config.exposeIdsFor(EmailAddress.class);
    }
}
