package net.savantly.sprout.core.domain.user.repository;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import net.savantly.sprout.core.domain.emailAddress.EmailAddress;

@JsonDeserialize(as=ProfileProjectionImpl.class)
public interface ProfileProjection {
	EmailAddress getPrimaryEmailAddress();
	List<EmailAddress> getEmailAddresses();
	String getUsername();
	String getDisplayName();
	@Value("#{target.getGravatarUrl()}")
	String getGravatarUrl();
}
