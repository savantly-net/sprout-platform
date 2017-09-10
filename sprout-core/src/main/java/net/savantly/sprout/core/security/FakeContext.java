package net.savantly.sprout.core.security;

import java.util.Collection;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import net.savantly.spring.fixture.util.RandomGenerator;

@Service
public class FakeContext {
    
    private static final Logger log = LoggerFactory.getLogger(FakeContext.class);
    

    public void create() {
        SproutUser user = new SproutUser("system", RandomGenerator.getRandomAlphaNumericString(20), "system", "user");
        FakeAuthentication auth = new FakeAuthentication(user);
        SecurityContextHolder.getContext().setAuthentication(auth);
    }
    
    protected class FakeAuthentication implements Authentication{
        
        private SproutUser user;

        public FakeAuthentication(SproutUser user){
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
