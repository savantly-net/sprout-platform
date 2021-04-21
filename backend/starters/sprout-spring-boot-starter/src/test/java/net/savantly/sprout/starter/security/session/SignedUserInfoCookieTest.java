package net.savantly.sprout.starter.security.session;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import net.savantly.sprout.core.domain.user.SproutUser;
import net.savantly.sprout.core.domain.user.SproutUserEntity;

public class SignedUserInfoCookieTest {

	@Test
	public void testCookieSerialization() throws CookieVerificationFailedException {
		
		String username = "user+test@example.com";
		String password = "123";
		String firstName = "user";
		String lastName = "test";
		
		SproutUser userInfo = new SproutUserEntity(username, password, firstName, lastName);
		
		String cookieHmacKey = "1234567890qwerty";
		int durationInHours = 1;
		SignedUserInfoCookie cookie = new SignedUserInfoCookie(userInfo, cookieHmacKey, durationInHours);
		
		String value = cookie.getValue();
		
		SignedUserInfoCookie rehydrated = new SignedUserInfoCookie(cookie, cookieHmacKey);
		
		Assertions.assertEquals(username, rehydrated.getUserInfo().getName());
	}
}
