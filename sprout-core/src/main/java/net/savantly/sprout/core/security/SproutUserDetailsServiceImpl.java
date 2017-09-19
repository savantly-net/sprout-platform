package net.savantly.sprout.core.security;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import net.savantly.sprout.core.domain.emailAddress.EmailAddress;
import net.savantly.sprout.core.domain.emailAddress.repository.EmailAddressRepository;
import net.savantly.sprout.core.domain.user.SproutUser;
import net.savantly.sprout.core.domain.user.SproutUserEntity;
import net.savantly.sprout.core.domain.user.repository.UserRepository;

@Component("userDetailsService")
public class SproutUserDetailsServiceImpl implements SproutUserDetailsService {

    UserRepository userRepository;
    EmailAddressRepository emailAddressRepository;
   

    public SproutUserDetailsServiceImpl(UserRepository userRepository, EmailAddressRepository emailAddressRepository) {
		super();
		this.userRepository = userRepository;
		this.emailAddressRepository = emailAddressRepository;
	}

	@Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        SproutUserEntity user = userRepository.findOneByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException(String.format("User not found: %s", username));
        } else {
            return user;
        }
    }

    @Override
    public SproutUser loadByEmailAddress(String emailAddress) {
        EmailAddress email = emailAddressRepository.findOne(emailAddress);
        return email.getUser();
    }

}
