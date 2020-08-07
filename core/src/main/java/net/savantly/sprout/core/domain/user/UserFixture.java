package net.savantly.sprout.core.domain.user;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;

import net.savantly.spring.fixture.AbstractBaseFixture;
import net.savantly.spring.fixture.Fixture;
import net.savantly.spring.fixture.util.RandomGenerator;
import net.savantly.sprout.core.configuration.SecurityConstants;
import net.savantly.sprout.core.domain.emailAddress.EmailAddress;
import net.savantly.sprout.core.domain.emailAddress.EmailAddressFixture;
import net.savantly.sprout.core.domain.emailAddress.repository.EmailAddressRepository;
import net.savantly.sprout.core.domain.user.repository.UserRepository;
import net.savantly.sprout.core.security.role.Role;
import net.savantly.sprout.core.security.role.RoleFixture;
import net.savantly.sprout.core.security.role.RoleRepository;

public class UserFixture extends AbstractBaseFixture<SproutUserEntity, UserRepository>{
	
    PasswordEncoder encoder;
    private EmailAddressRepository emailAddressRepository;
    private RoleRepository roleRepository;
    private Fixture<Role> roleFixture;
    private Fixture<EmailAddress> emailFixture;
    private UserRepository repository;

    private String password = "password";
 
    @Autowired
    public UserFixture(
    		UserRepository repository, 
    		PasswordEncoder encoder, 
    		EmailAddressRepository emailAddressRepository, 
    		RoleRepository roleRepository, 
    		Fixture<Role> roleFixture,
    		Fixture<EmailAddress> emailFixture) {
        super(repository);
        this.repository = repository;
        this.encoder = encoder;
        this.emailAddressRepository = emailAddressRepository;
        this.roleRepository = roleRepository;
        this.roleFixture = roleFixture;
        this.emailFixture = emailFixture;
    }

    @Override
    public void addEntities(List<SproutUserEntity> entityList) {
        addAdminUser(entityList);
        addSystemUser(entityList);
        addAnonymousUser(entityList);
    }
    
    private void addSystemUser(List<SproutUserEntity> entityList) {
        String username = SecurityConstants.SYSTEM_USER_ID;
        Optional<SproutUserEntity> optUserDetails = this.repository.findById(username);
        
        if(optUserDetails.isPresent()) return;
        
        Set<Role> authorities = new HashSet<Role>(1);
        authorities.add(getRole(RoleFixture.ADMIN_ROLE));
        SproutUserEntity userDetails = new SproutUserEntity(username, RandomGenerator.getRandomAlphaNumericString(25) , username, username, authorities);
        userDetails.setId(username);
        userDetails.setDisplayName("SYSTEM");
        
        EmailAddress emailAddress =  getEmailAddress(EmailAddressFixture.SYSTEM_EMAIL);
        userDetails.setPrimaryEmailAddress(emailAddress);
        entityList.add(userDetails);
    }
    
    private void addAnonymousUser(List<SproutUserEntity> entityList) {
        String username = SecurityConstants.ANONYMOUS_USER_ID;
        Optional<SproutUserEntity> optUserDetails = this.repository.findById(username);
        
        if(optUserDetails.isPresent()) return;
        
        Set<Role> authorities = new HashSet<Role>(1);
        authorities.add(getRole(RoleFixture.ANONYMOUS_ROLE));
        SproutUserEntity userDetails = new SproutUserEntity(username, RandomGenerator.getRandomAlphaNumericString(25) , username, username, authorities);
        userDetails.setId(username);
        userDetails.setDisplayName(SecurityConstants.ANONYMOUS_USER_ID);
        
        EmailAddress emailAddress =  getEmailAddress(EmailAddressFixture.ANONYMOUS_EMAIL);
        userDetails.setPrimaryEmailAddress(emailAddress);
        entityList.add(userDetails);
    }

    private void addAdminUser(List<SproutUserEntity> entityList) {
        String username = "admin";
        Optional<SproutUserEntity> optUserDetails = this.repository.findById(SecurityConstants.ADMIN_USER_ID);
        
        if(optUserDetails.isPresent()) return;
        
        Set<Role> authorities = new HashSet<Role>(1);
        authorities.add(getRole(RoleFixture.ADMIN_ROLE));
        SproutUserEntity userDetails = new SproutUserEntity(username, password , "Admin", "User", authorities);
        userDetails.setId(SecurityConstants.ADMIN_USER_ID);
        userDetails.setDisplayName("Admin User");
        userDetails.setPassword(encoder.encode(password));
        
        EmailAddress emailAddress =  getEmailAddress(EmailAddressFixture.ADMIN_EMAIL);
        userDetails.setPrimaryEmailAddress(emailAddress);
        entityList.add(userDetails);
    }

    private Role getRole(String roleId) {
    	return roleRepository.findById(roleId).orElseThrow(()->new RuntimeException("didn't find role: " + roleId));
    }
    
    private EmailAddress getEmailAddress(String id) {
    	return emailAddressRepository.findById(id).orElseThrow(()->new RuntimeException("didn't find email address with id: " + id));
    }
   
    public void addDependencies(List<Fixture<?>> dependencies) {
        dependencies.add(roleFixture);
        dependencies.add(emailFixture);
    }
}
