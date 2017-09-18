package net.savantly.sprout.core.security.roles;

import java.util.List;

import net.savantly.spring.fixture.AbstractBaseFixture;
import net.savantly.spring.fixture.Fixture;

public class RoleFixture extends AbstractBaseFixture<Role, RoleRepository>{
    
    RoleRepository repository;

    public RoleFixture(RoleRepository repository) {
        super(repository);
        this.repository = repository;
    }

    @Override
    public void addEntities(List<Role> entityList) {
        if(repository.findOne("USER") == null){
            entityList.add(new Role("USER"));
        }
        if(repository.findOne("ADMIN") == null){
            entityList.add(new Role("ADMIN"));
        }
    }

    @Override
    public void addDependencies(List<Fixture<?>> dependencies) {
    
    }

}
