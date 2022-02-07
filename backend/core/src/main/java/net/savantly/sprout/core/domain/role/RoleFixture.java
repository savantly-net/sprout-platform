package net.savantly.sprout.core.domain.role;

import java.util.List;

import net.savantly.spring.fixture.AbstractBaseFixture;
import net.savantly.spring.fixture.Fixture;
import net.savantly.sprout.core.domain.privilege.PrivilegeEntity;
import net.savantly.sprout.core.domain.privilege.PrivilegeFixture;
import net.savantly.sprout.core.domain.privilege.PrivilegeRepository;
import net.savantly.sprout.core.tenancy.TenantContext;

public class RoleFixture extends AbstractBaseFixture<RoleEntity, RoleRepository>{

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
    public void addEntities(List<RoleEntity> entityList) {
    	
        if(repository.findByNameAndTenantId(USER_ROLE, TenantContext.getCurrentTenant()).size() == 0){
        	RoleEntity role = new RoleEntity().setName(USER_ROLE);
        	role.getPrivileges().add(getPrivilege(PrivilegeFixture.READ));
            entityList.add(role);
        }
        if(repository.findByNameAndTenantId(ADMIN_ROLE, TenantContext.getCurrentTenant()).size() == 0){
        	RoleEntity role = new RoleEntity().setName(ADMIN_ROLE);
        	role.getPrivileges().add(getPrivilege(PrivilegeFixture.ADMIN));
            entityList.add(role);
        }
        if(repository.findByNameAndTenantId(ANONYMOUS_ROLE, TenantContext.getCurrentTenant()).size() == 0){
        	RoleEntity role = new RoleEntity().setName(ANONYMOUS_ROLE);
        	role.getPrivileges().add(getPrivilege(PrivilegeFixture.READ));
            entityList.add(role);
        }
    }
    
    private PrivilegeEntity getPrivilege(String id) {
    	return this.privilegeRepository.findById(id).orElseThrow(()-> new RuntimeException("didn't find privilege: " + id));
    }

    @Override
    public void addDependencies(List<Fixture<?>> dependencies) {
    
    	dependencies.add(privilegeFixture);
    }

}

