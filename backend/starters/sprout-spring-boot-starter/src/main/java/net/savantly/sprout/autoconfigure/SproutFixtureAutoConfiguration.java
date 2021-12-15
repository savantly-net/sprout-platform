package net.savantly.sprout.autoconfigure;

import java.util.Collection;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import javax.annotation.PostConstruct;
import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.autoconfigure.AutoConfigureAfter;
import org.springframework.boot.autoconfigure.data.jpa.JpaRepositoriesAutoConfiguration;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import net.savantly.spring.fixture.Fixture;
import net.savantly.sprout.core.domain.privilege.PrivilegeEntity;
import net.savantly.sprout.core.domain.privilege.PrivilegeFixture;
import net.savantly.sprout.core.domain.privilege.PrivilegeRepository;
import net.savantly.sprout.core.domain.role.RoleEntity;
import net.savantly.sprout.core.domain.role.RoleFixture;
import net.savantly.sprout.core.domain.role.RoleRepository;
import net.savantly.sprout.core.security.FakeContext;
import net.savantly.sprout.core.tenancy.TenantContext;

@Configuration
@AutoConfigureAfter(JpaRepositoriesAutoConfiguration.class)
@Transactional
public class SproutFixtureAutoConfiguration {
	
	private static final Logger log = LoggerFactory.getLogger(SproutFixtureAutoConfiguration.class);
	
    final private ApplicationContext ctx;
    final private RoleRepository roleRepository;   
    final private PrivilegeRepository privilegeRepository;
    
    public SproutFixtureAutoConfiguration(ApplicationContext ctx, RoleRepository roleRepository, PrivilegeRepository privilegeRepository) {
		this.ctx = ctx;
		this.roleRepository = roleRepository;
		this.privilegeRepository = privilegeRepository;

		// There's a race when testing, so let's not abort
		try {
    	PrivilegeEntity adminPrivilege = privilegeRepository
    			.findByNameAndTenantId("ADMIN", TenantContext.getCurrentTenant()).stream().findFirst().orElse(createAdminPrivilege());
    	ensureSystemRoleExists(adminPrivilege);
		} catch (Exception ex) {
			log.warn("failed to insert admin privilege and/or role", ex);
		}
	}
	
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
    	FakeContext fakeContext = new FakeContext();
        fakeContext.create(this.roleRepository);
        for (Fixture<?> fixture : getFixtures()) {
        	try {
        		fixture.install();
        	} catch (Exception ex) {
        		log.warn("could not install fixture", ex);
        	}
        }
    }
    
    private PrivilegeEntity createAdminPrivilege() {
    	PrivilegeEntity p = new PrivilegeEntity().setName("ADMIN");
    	return this.privilegeRepository.save(p);
	}

	private void ensureSystemRoleExists(PrivilegeEntity adminPrivilege) {
		this.roleRepository.findByName("SYSTEM").stream().findFirst().orElse(createSystemRole(adminPrivilege));//NOSONAR
	}

	private RoleEntity createSystemRole(PrivilegeEntity adminPrivilege) {
		Set<PrivilegeEntity> privileges = new HashSet<>();
		privileges.add(adminPrivilege);
		RoleEntity systemRole = new RoleEntity().setName("SYSTEM").setPrivileges(privileges);
		return this.roleRepository.save(systemRole);
	}

	private Collection<Fixture> getFixtures(){
    	Map<String, Fixture> fixtureBeans = ctx.getBeansOfType(Fixture.class);
		return fixtureBeans.values();
    }

}
