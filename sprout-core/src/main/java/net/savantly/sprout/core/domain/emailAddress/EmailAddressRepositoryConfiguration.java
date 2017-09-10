package net.savantly.sprout.core.domain.emailAddress;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;

@Configuration
public class EmailAddressRepositoryConfiguration {

    public EmailAddressRepositoryConfiguration(RepositoryRestConfiguration config){
        config.exposeIdsFor(EmailAddress.class);
    }
}
