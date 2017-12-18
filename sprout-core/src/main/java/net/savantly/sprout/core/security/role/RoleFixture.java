package net.savantly.sprout.core.security.role;

import java.util.List;

import net.savantly.spring.fixture.AbstractBaseFixture;
import net.savantly.spring.fixture.Fixture;
import net.savantly.sprout.core.security.privilege.PrivilegeFixture;
import net.savantly.sprout.core.security.privilege.PrivilegeRepository;

public class RoleFixture extends AbstractBaseFixture<Role, RoleRepository>{
    
    RoleRepository repository;
    PrivilegeFixture privilegeFixture;
	private PrivilegeRepository privilegeRepository;

    public RoleFixture(RoleRepository repository, PrivilegeFixture privilegeFixture, PrivilegeRepository privilegeRepository) {
        super(repository);
        this.repository = repository;
        this.privilegeFixture = privilegeFixture;
        this.privilegeRepository = privilegeRepository;
    }

    @Override
    public void addEntities(List<Role> entityList) {
    	
    	final String USER = "USER";
    	final String ADMIN = "ADMIN";
    	
        if(repository.findOne(USER) == null){
        	Role role = new Role(USER);
        	role.getPrivileges().add(this.privilegeRepository.findOne(PrivilegeFixture.GENERAL_READ));
            entityList.add(role);
        }
        if(repository.findOne(ADMIN) == null){
        	Role role = new Role(ADMIN);
        	role.getPrivileges().add(this.privilegeRepository.findOne(PrivilegeFixture.GENERAL_ADMIN));
            entityList.add(role);
        }
    }

    @Override
    public void addDependencies(List<Fixture<?>> dependencies) {
    
    	dependencies.add(privilegeFixture);
    }

}
