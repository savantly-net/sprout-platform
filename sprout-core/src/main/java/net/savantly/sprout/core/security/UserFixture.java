package net.savantly.sprout.core.security;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import net.savantly.spring.fixture.AbstractBaseFixture;
import net.savantly.spring.fixture.Fixture;
import net.savantly.spring.fixture.util.RandomGenerator;
import net.savantly.sprout.core.domain.emailAddress.EmailAddress;
import net.savantly.sprout.core.domain.emailAddress.EmailAddressRepository;
import net.savantly.sprout.core.domain.organization.OrganizationRepository;
import net.savantly.sprout.core.security.repository.UserRepository;
import net.savantly.sprout.core.security.roles.Role;
import net.savantly.sprout.core.security.roles.RoleRepository;

@Service
public class UserFixture extends AbstractBaseFixture<SproutUser, UserRepository>{

    @Autowired
    PasswordEncoder encoder;
    @Autowired
    private OrganizationRepository orgs;
    @Autowired
    private EmailAddressRepository emailAddressRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private Fixture<Role> roleFixture;
    @Autowired
    private Fixture<EmailAddress> emailFixture;
    private UserRepository repository;

    private String password = "password";
 
    @Autowired
    public UserFixture(UserRepository repository) {
        super(repository);
        this.repository = repository;
    }

    @Override
    public void addEntities(List<SproutUser> entityList) {
        addAdminUser(entityList);
        addSystemUser(entityList);
    }
    
    private void addSystemUser(List<SproutUser> entityList) {
        String username = "system";
        SproutUser userDetails = this.repository.findOneByUsername(username);
        
        if(userDetails != null) return;
        
        List<Role> authorities = new ArrayList<Role>(1);
        authorities.add(roleRepository.findOne("ADMIN"));
        userDetails = new SproutUser(username, RandomGenerator.getRandomAlphaNumericString(25) , username, username, authorities);
        
        EmailAddress emailAddress =  emailAddressRepository.findOne("system@savantly");
        userDetails.setPrimaryEmailAddress(emailAddress);
        entityList.add(userDetails);
    }

    private void addAdminUser(List<SproutUser> entityList) {
        String username = "admin";
        SproutUser userDetails = this.repository.findOneByUsername(username);
        
        if(userDetails != null) return;
        
        List<Role> authorities = new ArrayList<Role>(1);
        authorities.add(roleRepository.findOne("ADMIN"));
        userDetails = new SproutUser(username, password , "Admin", "User", authorities);
        userDetails.setPassword(encoder.encode(password));
        userDetails.setPhoneNumber("18177911627");
        
        EmailAddress emailAddress =  emailAddressRepository.findOne("admin@intnt.co");
        userDetails.setPrimaryEmailAddress(emailAddress);
        entityList.add(userDetails);
    }

   
    public void addDependencies(List<Fixture<?>> dependencies) {
        dependencies.add(roleFixture);
        dependencies.add(emailFixture);
    }

}
