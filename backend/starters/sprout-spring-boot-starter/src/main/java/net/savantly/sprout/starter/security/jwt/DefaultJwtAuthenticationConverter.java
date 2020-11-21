package net.savantly.sprout.starter.security.jwt;

import org.springframework.core.convert.converter.Converter;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;

import net.savantly.authorization.service.PermissionAwareJwtAuthenticationConverter;
import net.savantly.authorization.service.PermissionProvider;
import net.savantly.sprout.core.security.SproutUserService;

public class DefaultJwtAuthenticationConverter implements Converter<Jwt, AbstractAuthenticationToken>  {

	private final PermissionAwareJwtAuthenticationConverter internalConverter;
	private final SproutUserService users;
	
	public DefaultJwtAuthenticationConverter(SproutUserService users, PermissionProvider permissionProvider, String groupsClaim) {
		this.internalConverter = new PermissionAwareJwtAuthenticationConverter(permissionProvider, groupsClaim);
		this.users = users;
	}

	@Override
	public final AbstractAuthenticationToken convert(Jwt jwt) {
		JwtAuthenticationToken internalToken = (JwtAuthenticationToken)internalConverter.convert(jwt);
		return new WrappedToken(internalToken, users);
	}
	
	private static class WrappedToken extends AbstractAuthenticationToken {
		private JwtAuthenticationToken token;
		private final SproutUserService users;
		public WrappedToken(JwtAuthenticationToken token, SproutUserService users) {
			super(token.getAuthorities());
			this.users = users;
			this.token = token;
		}

		@Override
		public Object getCredentials() {
			return token.getCredentials();
		}

		@Override
		public Object getPrincipal() {
			if (users.usernameExists(token.getToken().getSubject())) {
				return users.loadUserByUsername(token.getToken().getSubject());
			} else {
				return new SproutJwtUser(token);
			}
		}
	}
}
