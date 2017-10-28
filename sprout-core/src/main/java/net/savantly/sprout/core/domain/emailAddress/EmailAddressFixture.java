package net.savantly.sprout.core.domain.emailAddress;

import java.util.List;

import net.savantly.spring.fixture.AbstractBaseFixture;
import net.savantly.spring.fixture.Fixture;
import net.savantly.sprout.core.domain.emailAddress.repository.EmailAddressRepository;


public class EmailAddressFixture extends AbstractBaseFixture<EmailAddress, EmailAddressRepository> {

    public static final String SYSTEM_EMAIL = "system@savantly.net";
    public static final String ADMIN_EMAIL = "admin@savantly.net";
    
    private EmailAddressRepository repository;

    public EmailAddressFixture(EmailAddressRepository repository) {
        super(repository);
        this.repository = repository;
    }

    @Override
    public void addEntities(List<EmailAddress> entityList) {
        if(repository.findOne(SYSTEM_EMAIL) == null){
            entityList.add(new EmailAddress(SYSTEM_EMAIL));
        }
        if(repository.findOne(ADMIN_EMAIL) == null){
            entityList.add(new EmailAddress(ADMIN_EMAIL));
        }
    }

    @Override
    public void addDependencies(List<Fixture<?>> dependencies) {
        // TODO Auto-generated method stub
        
    }

}