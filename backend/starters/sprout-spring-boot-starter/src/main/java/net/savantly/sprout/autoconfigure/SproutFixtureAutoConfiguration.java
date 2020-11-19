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

import net.savantly.spring.fixture.Fixture;
import net.savantly.sprout.core.security.FakeContext;
import net.savantly.sprout.core.security.privilege.PrivilegeFixture;
import net.savantly.sprout.core.security.privilege.PrivilegeRepository;
import net.savantly.sprout.core.security.role.RoleFixture;
import net.savantly.sprout.core.security.role.RoleRepository;

@Configuration
@AutoConfigureAfter(JpaRepositoriesAutoConfiguration.class)
public class SproutFixtureAutoConfiguration {
	
	private static final Logger log = LoggerFactory.getLogger(SproutFixtureAutoConfiguration.class);
	
    @Autowired
	ApplicationContext ctx;
    
	
	@Bean
	public RoleFixture roleFixture(RoleRepository repository, PrivilegeFixture privilegeFixture, PrivilegeRepository privilegeRepository) {
		return new RoleFixture(repository, privilegeFixture, privilegeRepository);
	}

	@Bean
	PrivilegeFixture privilegeFixture(PrivilegeRepository repository) {
		return new PrivilegeFixture(repository);
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
