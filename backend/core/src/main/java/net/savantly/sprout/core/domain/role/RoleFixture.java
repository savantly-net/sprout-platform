package net.savantly.sprout.core.domain.role;

import java.util.List;

import net.savantly.spring.fixture.AbstractBaseFixture;
import net.savantly.spring.fixture.Fixture;
import net.savantly.sprout.core.domain.privilege.Privilege;
import net.savantly.sprout.core.domain.privilege.PrivilegeFixture;
import net.savantly.sprout.core.domain.privilege.PrivilegeRepository;

public class RoleFixture extends AbstractBaseFixture<Role, RoleRepository>{

	public static final String USER_ROLE = "ROLE_USER";
	public static final String ADMIN_ROLE = "ROLE_ADMIN";
	public static final String ANONYMOUS_ROLE = "ROLE_ANONYMOUS";
    
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
    	
        if(repository.findByName(USER_ROLE).size() == 0){
        	Role role = new Role().setName(USER_ROLE);
        	role.getPrivileges().add(getPrivilege(PrivilegeFixture.GENERAL_READ));
            entityList.add(role);
        }
        if(repository.findByName(ADMIN_ROLE).size() == 0){
        	Role role = new Role().setName(ADMIN_ROLE);
        	role.getPrivileges().add(getPrivilege(PrivilegeFixture.GENERAL_ADMIN));
            entityList.add(role);
        }
        if(repository.findByName(ANONYMOUS_ROLE).size() == 0){
        	Role role = new Role().setName(ANONYMOUS_ROLE);
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

