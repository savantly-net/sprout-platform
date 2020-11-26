package net.savantly.sprout.starter.security.jwt;

import org.springframework.core.convert.converter.Converter;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;

import net.savantly.authorization.service.PermissionAwareJwtAuthenticationConverter;
import net.savantly.authorization.service.PermissionProvider;
import net.savantly.sprout.core.domain.user.SproutUser;
import net.savantly.sprout.core.security.SproutUserService;

public class DefaultJwtAuthenticationConverter implements Converter<Jwt, AbstractAuthenticationToken>  {

	private final PermissionAwareJwtAuthenticationConverter internalConverter;
	private final SproutUserService users;
	private final JwtUserSynchronizer synchronizer;
	
	public DefaultJwtAuthenticationConverter(JwtUserSynchronizer synchronizer, SproutUserService users, PermissionProvider permissionProvider, String groupsClaim) {
		this.internalConverter = new PermissionAwareJwtAuthenticationConverter(permissionProvider, groupsClaim);
		this.users = users;
		this.synchronizer = synchronizer;
	}

	@Override
	public final AbstractAuthenticationToken convert(Jwt jwt) {
		SproutUser user = this.synchronizer.syncUser(jwt);
		
		JwtAuthenticationToken internalToken = (JwtAuthenticationToken)internalConverter.convert(jwt);
		SproutJwtAuthenticationToken authToken = new SproutJwtAuthenticationToken(internalToken, user);
		return authToken;
	}
}
