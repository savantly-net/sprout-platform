package net.savantly.sprout.autoconfigure;

import java.util.Collection;
import java.util.Map;

import javax.annotation.PostConstruct;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.AutoConfigureAfter;
import org.springframework.boot.autoconfigure.data.jpa.JpaRepositoriesAutoConfiguration;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import net.savantly.spring.fixture.Fixture;
import net.savantly.sprout.core.content.contentTemplate.ContentTemplateFixture;
import net.savantly.sprout.core.content.contentTemplate.ContentTemplateRepository;
import net.savantly.sprout.core.content.contentType.ContentTypeFixture;
import net.savantly.sprout.core.content.contentType.ContentTypeRepository;
import net.savantly.sprout.core.domain.emailAddress.EmailAddress;
import net.savantly.sprout.core.domain.emailAddress.EmailAddressFixture;
import net.savantly.sprout.core.domain.emailAddress.repository.EmailAddressRepository;
import net.savantly.sprout.core.domain.user.UserFixture;
import net.savantly.sprout.core.domain.user.repository.UserRepository;
import net.savantly.sprout.core.security.FakeContext;
import net.savantly.sprout.core.security.roles.Role;
import net.savantly.sprout.core.security.roles.RoleFixture;
import net.savantly.sprout.core.security.roles.RoleRepository;

@Configuration
@AutoConfigureAfter(JpaRepositoriesAutoConfiguration.class)
public class SproutFixtureAutoConfiguration {
	
	private static final Logger log = LoggerFactory.getLogger(SproutFixtureAutoConfiguration.class);
	
    @Autowired
	ApplicationContext ctx;
	
	@Bean 
	public RoleFixture roleFixture(RoleRepository repository) {
		return new RoleFixture(repository);
	}
	
	@Bean 
	public EmailAddressFixture emailFixture(EmailAddressRepository repository) {
		return new EmailAddressFixture(repository);
	}
	
	@Bean 
	public UserFixture userFixture(UserRepository repository, PasswordEncoder passwordEncoder, EmailAddressRepository emailAddressRepository, RoleRepository roleRepository, Fixture<Role> roleFixture, Fixture<EmailAddress> emailFixture) {
		return new UserFixture(
				repository, 
				passwordEncoder, 
				emailAddressRepository, 
				roleRepository, 
				roleFixture, 
				emailFixture);
	}
	
/*	@Bean 
	public ContentTypeFixture contentTypeFixture(ContentTypeRepository repository, ContentTemplateFixture fixture, ContentTemplateRepository templateRepository) {
		return new ContentTypeFixture(repository, fixture, templateRepository);
	}
	*/
	@Bean
	public ContentTemplateFixture contentTemplateFixture(ContentTemplateRepository templateRepository) {
		return new ContentTemplateFixture(templateRepository);
	}
	
    @PostConstruct
    public void installFixtures() {
    	FakeContext fakeContext = new FakeContext();
        fakeContext.create();
        for (Fixture<?> fixture : getFixtures()) {
        	try {
        		fixture.install();
        	} catch (Exception ex) {
        		log.error("could not install fixture", ex);
        		throw ex;
        	}
        }
    }
    
    private Collection<Fixture> getFixtures(){
    	Map<String, Fixture> fixtureBeans = ctx.getBeansOfType(Fixture.class);
		return fixtureBeans.values();
    }

}
