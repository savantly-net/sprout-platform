package net.savantly.sprout.core.domain.emailAddress;

import java.util.List;

import org.springframework.stereotype.Service;

import net.savantly.spring.fixture.AbstractBaseFixture;
import net.savantly.spring.fixture.Fixture;
import net.savantly.sprout.core.domain.emailAddress.repository.EmailAddressRepository;

@Service
public class EmailAddressFixture extends AbstractBaseFixture<EmailAddress, EmailAddressRepository> {

    private EmailAddressRepository repository;

    public EmailAddressFixture(EmailAddressRepository repository) {
        super(repository);
        this.repository = repository;
    }

    @Override
    public void addEntities(List<EmailAddress> entityList) {
        String SYSTEMEmail = "system@savantly.net";
        if(repository.findOne(SYSTEMEmail) == null){
            entityList.add(new EmailAddress(SYSTEMEmail));
        }
        String adminEmail = "admin@savantly.net";
        if(repository.findOne(adminEmail) == null){
            entityList.add(new EmailAddress(adminEmail));
        }
    }

    @Override
    public void addDependencies(List<Fixture<?>> dependencies) {
        // TODO Auto-generated method stub
        
    }

}