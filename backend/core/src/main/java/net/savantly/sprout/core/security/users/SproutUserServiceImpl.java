package net.savantly.sprout.core.security.users;

import java.util.Collection;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;
import java.util.function.Consumer;
import java.util.stream.Collectors;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;

import net.savantly.sprout.core.domain.emailAddress.EmailAddress;
import net.savantly.sprout.core.domain.emailAddress.repository.EmailAddressRepository;
import net.savantly.sprout.core.domain.role.RoleEntity;
import net.savantly.sprout.core.domain.role.RoleRepository;
import net.savantly.sprout.core.domain.user.SproutUser;
import net.savantly.sprout.core.domain.user.SproutUserEntity;
import net.savantly.sprout.core.domain.user.UserUpdateDto;
import net.savantly.sprout.core.domain.user.repository.UserRepository;
import net.savantly.sprout.core.security.exception.UserIdNotFoundException;
import net.savantly.sprout.core.tenancy.TenantContext;
import net.savantly.sprout.core.tenancy.TenantedPrimaryKey;

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
	public SproutUser loadUserByUserId(String userId) throws UserIdNotFoundException {
		TenantedPrimaryKey id = new TenantedPrimaryKey();
		id.setItemId(userId);
		SproutUserEntity user = userRepository.findOneById_ItemId(userId);
		if (Objects.nonNull(user)) {
			return user;
		} else {
			throw new UserIdNotFoundException(userId);
		}
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
		return createUser(username, password, emailAddress, null, null, roles);
	}

	@Override
	public SproutUser createUser(String username, String password, String emailAddress, String firstName, String lastName, Collection<String> roles) {
		Set<RoleEntity> authorities = roles.parallelStream().map(r -> getRole(r)).collect(Collectors.toSet());
		SproutUserEntity userDetails = new SproutUserEntity(username, password, null, null, authorities);
		userDetails.setDisplayName(username);
		userDetails.setPassword(encoder.encode(password));
		userDetails.setFirstName(firstName);
		userDetails.setLastName(lastName);

		if (getEmailAddress(emailAddress).isPresent()) {
			throw new RuntimeException("email is already registered");
		}

		EmailAddress emailAddressEntity = new EmailAddress(emailAddress);
		userDetails.setPrimaryEmailAddress(emailAddressEntity);
		SproutUserEntity saved = userRepository.save(userDetails);
		//userRepository.flush();
		return saved;
	}

	@Override
	public boolean usernameExists(String username) {
		return Objects.nonNull(this.userRepository.findOneByUsername(username));
	}

	private RoleEntity getRole(String roleName) {
		Optional<RoleEntity> role = roleRepository.findByNameAndTenantId(roleName, TenantContext.getCurrentTenant()).stream().findFirst();
		if(role.isPresent()) {
			return role.get();
		} else {
			return roleRepository.save(new RoleEntity().setName(roleName));
		}
	}

	private Optional<EmailAddress> getEmailAddress(String emailAddress) {
		return emailAddressRepository.findByEmailAddress(emailAddress)
				.stream()
				.findFirst();
	}

	@Override
	public boolean emailAddressExists(String email) {
		return getEmailAddress(email).isPresent();
	}

	@Override
	public SproutUser updateUser(UserUpdateDto user) {
		SproutUserEntity entity = userRepository.findOneByUsername(user.getUsername());
		
		ifValuePresent(user.getFirstName(), v -> entity.setFirstName(v));
		ifValuePresent(user.getLastName(), v -> entity.setLastName(v));

		if (Objects.nonNull(user.getRoles()) && !user.getRoles().isEmpty()) {
			entity.setRoles(user.getRoles().stream().map(r -> getRole(r)).collect(Collectors.toSet()));
		}
		/*
		entity.setAccountNonExpired(user.isAccountNonExpired());
		entity.setAccountNonLocked(user.isAccountNonLocked());
		entity.setDisplayName(user.getDisplayName());
		entity.setEnabled(user.isEnabled());
		entity.setHidePrimaryEmailAddress(user.isHidePrimaryEmailAddress());
		entity.setOAuthAccounts(user.getOAuthAccounts());
		entity.setOrganization(user.getOrganization());
		entity.setPhoneNumber(user.getPhoneNumber());
		entity.setPrimaryEmailAddress(user.getPrimaryEmailAddress());
		*/
		return userRepository.save(entity);
	}

	private <T> void ifValuePresent(T value, Consumer<T> consumer) {
		if (Objects.nonNull(value)) {
			consumer.accept(value);
		}
	}

	@Override
	public void updatePassword(SproutUser user, String clearText) {
		SproutUserEntity entity = userRepository.findOneByUsername(user.getUsername());
		entity.setClearTextPassword(clearText);
		userRepository.save(entity);
	}

}
