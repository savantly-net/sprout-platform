package net.savantly.sprout.autoconfigure;

import java.util.Collection;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

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
import net.savantly.sprout.core.domain.privilege.Privilege;
import net.savantly.sprout.core.domain.privilege.PrivilegeFixture;
import net.savantly.sprout.core.domain.privilege.PrivilegeRepository;
import net.savantly.sprout.core.domain.role.Role;
import net.savantly.sprout.core.domain.role.RoleFixture;
import net.savantly.sprout.core.domain.role.RoleRepository;
import net.savantly.sprout.core.security.FakeContext;

@Configuration
@AutoConfigureAfter(JpaRepositoriesAutoConfiguration.class)
public class SproutFixtureAutoConfiguration {
	
	private static final Logger log = LoggerFactory.getLogger(SproutFixtureAutoConfiguration.class);
	
    @Autowired
	ApplicationContext ctx;
    @Autowired
    private RoleRepository roleRepository;   
    @Autowired
    private PrivilegeRepository privilegeRepository;
	
	@Bean
	public RoleFixture roleFixture(PrivilegeFixture privilegeFixture, PrivilegeRepository privilegeRepository) {
		return new RoleFixture(roleRepository, privilegeFixture, privilegeRepository);
	}

	@Bean
	PrivilegeFixture privilegeFixture(PrivilegeRepository repository) {
		return new PrivilegeFixture(repository);
	}

	
    @PostConstruct
    public void installFixtures() {
    	Privilege adminPrivilege = privilegeRepository.findByName("ADMIN").stream().findFirst().orElse(createAdminPrivilege());
    	ensureSystemRoleExists(adminPrivilege);
    	FakeContext fakeContext = new FakeContext();
        fakeContext.create(this.roleRepository);
        for (Fixture<?> fixture : getFixtures()) {
        	try {
        		fixture.install();
        	} catch (Exception ex) {
        		log.error("could not install fixture", ex);
        		throw ex;
        	}
        }
    }
    
    private Privilege createAdminPrivilege() {
    	Privilege p = new Privilege().setName("ADMIN");
    	return this.privilegeRepository.save(p);
	}

	private void ensureSystemRoleExists(Privilege adminPrivilege) {
		this.roleRepository.findByName("SYSTEM").stream().findFirst().orElse(createSystemRole(adminPrivilege));
	}

	private Role createSystemRole(Privilege adminPrivilege) {
		Set<Privilege> privileges = new HashSet<>();
		privileges.add(adminPrivilege);
		Role systemRole = new Role().setName("SYSTEM").setPrivileges(privileges);
		return this.roleRepository.save(systemRole);
	}

	private Collection<Fixture> getFixtures(){
    	Map<String, Fixture> fixtureBeans = ctx.getBeansOfType(Fixture.class);
		return fixtureBeans.values();
    }

}
