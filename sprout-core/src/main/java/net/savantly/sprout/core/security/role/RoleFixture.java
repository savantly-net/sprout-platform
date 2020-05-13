package net.savantly.sprout.core.security.role;

import java.util.List;

import net.savantly.spring.fixture.AbstractBaseFixture;
import net.savantly.spring.fixture.Fixture;
import net.savantly.sprout.core.security.privilege.Privilege;
import net.savantly.sprout.core.security.privilege.PrivilegeFixture;
import net.savantly.sprout.core.security.privilege.PrivilegeRepository;

public class RoleFixture extends AbstractBaseFixture<Role, RoleRepository>{

	public static final String USER_ROLE = "USER";
	public static final String ADMIN_ROLE = "ADMIN";
	public static final String ANONYMOUS_ROLE = "ANONYMOUS";
    
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
    	
        if(!repository.findById(USER_ROLE).isPresent()){
        	Role role = new Role(USER_ROLE);
        	role.getPrivileges().add(getPrivilege(PrivilegeFixture.GENERAL_READ));
            entityList.add(role);
        }
        if(!repository.findById(ADMIN_ROLE).isPresent()){
        	Role role = new Role(ADMIN_ROLE);
        	role.getPrivileges().add(getPrivilege(PrivilegeFixture.GENERAL_ADMIN));
            entityList.add(role);
        }
        if(!repository.findById(ANONYMOUS_ROLE).isPresent()){
        	Role role = new Role(ANONYMOUS_ROLE);
        	role.getPrivileges().add(getPrivilege(PrivilegeFixture.GENERAL_READ));
            entityList.add(role);
        }
    }
    
    private Privilege getPrivilege(String id) {
    	return this.privilegeRepository.findById(id).orElseThrow(()-> new RuntimeException("didn't find privilege: " + id));
    }

    @Override
    public void addDependencies(List<Fixture<?>> dependencies) {
    
    	dependencies.add(privilegeFixture);
    }

}

