package net.savantly.sprout.core.security;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;

import net.savantly.spring.fixture.util.RandomGenerator;
import net.savantly.sprout.core.domain.role.Role;
import net.savantly.sprout.core.domain.role.RoleRepository;
import net.savantly.sprout.core.domain.user.SproutUserEntity;
import net.savantly.sprout.core.tenancy.TenantContext;

public class FakeContext {
    
    private static final Logger log = LoggerFactory.getLogger(FakeContext.class);
    

    public void create(RoleRepository roleRepo) {
    	Set<Role> roles = new HashSet<>();
    	roles.add(roleRepo.findByNameAndTenantId("SYSTEM", TenantContext.getCurrentTenant()).stream().findFirst().orElseThrow(() -> new RuntimeException("There is no SYSTEM role")));
        SproutUserEntity user = new SproutUserEntity("system", RandomGenerator.getRandomAlphaNumericString(20), "system", "user", roles);
        FakeAuthentication auth = new FakeAuthentication(user);
        SecurityContextHolder.getContext().setAuthentication(auth);
    }
    
    protected class FakeAuthentication implements Authentication{
        
        private SproutUserEntity user;

        public FakeAuthentication(SproutUserEntity user){
            this.user = user;
            
        }
        @Override
        public String getName() { return user.getUsername(); }
        
        @Override
        public void setAuthenticated(boolean isAuthenticated) throws IllegalArgumentException {}
        
        @Override
        public boolean isAuthenticated() {return true;}
        
        @Override
        public Object getPrincipal() {return user.getUsername(); }
        
        @Override
        public Object getDetails() { return user; }
        
        @Override
        public Object getCredentials() { return null; }
        
        @Override
        public Collection<? extends GrantedAuthority> getAuthorities() {return user.getAuthorities();}
    }
}
