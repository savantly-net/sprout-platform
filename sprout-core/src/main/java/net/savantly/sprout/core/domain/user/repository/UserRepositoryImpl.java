package net.savantly.sprout.core.domain.user.repository;

import java.util.Collection;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

import javax.persistence.EntityManager;

import org.springframework.security.crypto.password.PasswordEncoder;

import net.savantly.sprout.core.domain.emailAddress.EmailAddress;
import net.savantly.sprout.core.domain.emailAddress.repository.EmailAddressRepository;
import net.savantly.sprout.core.domain.oauth.OAuthAccount;
import net.savantly.sprout.core.domain.user.SproutUser;
import net.savantly.sprout.core.domain.user.SproutUserEntity;
import net.savantly.sprout.core.security.role.DefaultRoleProjection;
import net.savantly.sprout.core.security.role.Role;

public class UserRepositoryImpl implements UserRepositoryCustom {
	
    private EntityManager em;
	PasswordEncoder encoder;
	EmailAddressRepository emailAddressRepository;
	
	public UserRepositoryImpl(EntityManager em, PasswordEncoder encoder, EmailAddressRepository emailAddressRepository) {
		// TODO Auto-generated constructor stub
	}

	/**
	 * Set the password in cleartext
	 */
	@Override
	public SproutUser insert(SproutUserEntity sproutUser) {
		if(sproutUser.getAuthorities().isEmpty()){
			Set<Role> roles = new HashSet<Role>(1);
			roles.add(new Role("ROLE_USER"));
	        sproutUser.setRoles(roles);
		}
        sproutUser.setPassword(encoder.encode(sproutUser.getPassword()));
        sproutUser.setAccountNonExpired(true);
        sproutUser.setAccountNonLocked(true);
        sproutUser.setCredentialsNonExpired(true);
        sproutUser.setEnabled(true);
		em.persist(sproutUser);
		return sproutUser;
	}
	
	
	/**
	 * Insert a new user with a generated username and password
	 */
	@Override
	public SproutUser insert(String firstName, String lastName, EmailAddress emailAddress){
		SproutUserEntity sproutUser = new SproutUserEntity(UUID.randomUUID().toString(), UUID.randomUUID().toString(), firstName, lastName);
		sproutUser.addEmailAddress(emailAddress);
		return insert(sproutUser);
	}
	
	@Override
	public SproutUser insert(String firstName, String lastName, OAuthAccount oauthAccount, Collection<EmailAddress> emailAddresses ){
		SproutUserEntity sproutUser = new SproutUserEntity(UUID.randomUUID().toString(), UUID.randomUUID().toString(), firstName, lastName);
		sproutUser.addEmailAddress(emailAddresses);
		sproutUser.addOAuthAccount(oauthAccount);
		sproutUser.setDisplayName(String.format("%s %s", firstName, lastName));
		return insert(sproutUser);
	}


	@Override
	public SproutUser insert(String username, String clearTextPassword, String firstName, String lastName) {
		return insert(username, clearTextPassword, firstName, lastName, Collections.<Role> emptySet());
	}

	@Override
	public SproutUser insert(String username, String clearTextPassword, String firstName, String lastName, Set<Role> authorities) {
		SproutUserEntity user = new SproutUserEntity(username, clearTextPassword, firstName, lastName, authorities);
		return insert(user);
	}
	
	@Override
	public SproutUser getOrInsertForOAuth(String firstName, String lastName, OAuthAccount oAuthAccount, Collection<EmailAddress> emailAddresses ){

	/*	emailAddressRepository.findOrInsert(emailAddresses);
		Object[] emailStrings = emailAddresses.stream().map(e->e.getEmailAddress()).toArray();
		CriteriaBuilder cb = mongoTemplate.getCriteriaBuilder();
		CriteriaQuery<SproutUser> query = cb.createQuery(SproutUser.class);
		query.from(SproutUser.class)*/
		
		/*Query query = Query.query(Criteria.where("emailAddresses.emailAddress").in(emailStrings));
		SproutUser userDetails = mongoTemplate.findOne(query, SproutUser.class);*/
		
/*		if(userDetails == null){
			userDetails = insert(firstName, lastName, oAuthAccount, emailAddresses);
			mongoTemplate.save(userDetails);
		}
		return userDetails;
		*/
		return null;
	}


	@Override
	public SproutUser updateMyProfile(SproutUser profile) {
/*		SproutUser userDetails = mongoTemplate.findOne(Query.query(Criteria.where("username").is(profile.getUsername())), SproutUser.class);
		userDetails.clearEmailAddresses();
		userDetails.addEmailAddress(profile.getEmailAddresses());
		userDetails.setDisplayName(profile.getDisplayName());
		userDetails.setFirstName(profile.getFirstName());
		userDetails.setLastName(profile.getLastName());
		userDetails.setPrimaryEmailAddress(profile.getPrimaryEmailAddress());
		mongoTemplate.persist(userDetails);
		return userDetails;*/
		return null;
	}
}