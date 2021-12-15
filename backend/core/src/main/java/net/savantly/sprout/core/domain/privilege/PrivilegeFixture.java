package net.savantly.sprout.core.domain.privilege;

import java.util.List;

import net.savantly.spring.fixture.AbstractBaseFixture;
import net.savantly.spring.fixture.Fixture;

public class PrivilegeFixture extends AbstractBaseFixture<PrivilegeEntity, PrivilegeRepository>{
	
	public static final String READ = "READ";
	public static final String ADMIN = "ADMIN";
    
    PrivilegeRepository repository;

    public PrivilegeFixture(PrivilegeRepository repository) {
        super(repository);
        this.repository = repository;
    }

    @Override
    public void addEntities(List<PrivilegeEntity> entityList) {
        if(!repository.findById(READ).isPresent()){
            entityList.add(create(READ));
        }
        if(!repository.findById(ADMIN).isPresent()){
            entityList.add(create(ADMIN));
        }
    }

    private PrivilegeEntity create(String name) {
    	PrivilegeEntity priv = new PrivilegeEntity().setName(name);
    	priv.setId(name);
    	return priv;
	}

	@Override
    public void addDependencies(List<Fixture<?>> dependencies) {
    
    }

}
