package net.savantly.sprout.core.security;

import java.util.Collection;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;

import net.savantly.sprout.core.domain.emailAddress.EmailAddress;
import net.savantly.sprout.core.domain.emailAddress.repository.EmailAddressRepository;
import net.savantly.sprout.core.domain.user.SproutUser;
import net.savantly.sprout.core.domain.user.SproutUserEntity;
import net.savantly.sprout.core.domain.user.repository.UserRepository;
import net.savantly.sprout.core.security.role.Role;
import net.savantly.sprout.core.security.role.RoleRepository;

@Transactional
public class SproutUserServiceImpl implements SproutUserService {

	PasswordEncoder encoder;
	UserRepository userRepository;
	EmailAddressRepository emailAddressRepository;
	RoleRepository roleRepository;

	public SproutUserServiceImpl(UserRepository userRepository, EmailAddressRepository emailAddressRepository,
			RoleRepository roleRepository, PasswordEncoder encoder) {
		super();
		this.userRepository = userRepository;
		this.emailAddressRepository = emailAddressRepository;
		this.roleRepository = roleRepository;
		this.encoder = encoder;
	}

	@Override
	public SproutUser loadUserByUsername(String username) throws UsernameNotFoundException {
		SproutUserEntity user = userRepository.findOneByUsername(username);
		if (user == null) {
			throw new UsernameNotFoundException(String.format("User not found: %s", username));
		} else {
			return user;
		}
	}

	@Override
	public SproutUser loadByEmailAddress(String emailAddress) {
		EmailAddress email = emailAddressRepository.findByEmailAddress(emailAddress)
				.stream().findFirst()
				.orElseThrow(() -> new RuntimeException("did not find email address: " + emailAddress));
		return email.getUser();
	}

	@Override
	public SproutUser createUser(String username, String password, String emailAddress, Collection<String> roles) {
		Set<Role> authorities = roles.parallelStream().map(r -> getRole(r)).collect(Collectors.toSet());
		SproutUserEntity userDetails = new SproutUserEntity(username, password, null, null, authorities);
		userDetails.setDisplayName(username);
		userDetails.setPassword(encoder.encode(password));

		if (getEmailAddress(emailAddress).isPresent()) {
			throw new RuntimeException("email is already registered");
		}

		EmailAddress emailAddressEntity = new EmailAddress(emailAddress);
		userDetails.setPrimaryEmailAddress(emailAddressEntity);
		return userRepository.save(userDetails);
	}

	@Override
	public boolean usernameExists(String username) {
		return Objects.nonNull(this.userRepository.findOneByUsername(username));
	}

	private Role getRole(String roleName) {
		Optional<Role> role = roleRepository.findByName(roleName).stream().findFirst();
		if(role.isPresent()) {
			return role.get();
		} else {
			return roleRepository.save(new Role().setName(roleName));
		}
	}

	private Optional<EmailAddress> getEmailAddress(String emailAddress) {
		return emailAddressRepository.findByEmailAddress(emailAddress)
				.stream()
				.findFirst();
	}
}
