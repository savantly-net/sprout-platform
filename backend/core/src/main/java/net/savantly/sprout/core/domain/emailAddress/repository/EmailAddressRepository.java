package net.savantly.sprout.core.domain.emailAddress.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import net.savantly.sprout.core.domain.emailAddress.EmailAddress;

public interface EmailAddressRepository extends JpaRepository<EmailAddress, String> {

	List<EmailAddress> findByEmailAddress(String emailAddress);

}
