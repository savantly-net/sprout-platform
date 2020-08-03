package net.savantly.sprout.core.domain.user.repository;
import org.springframework.data.rest.core.config.Projection;

import net.savantly.sprout.core.domain.user.SproutUser;
import net.savantly.sprout.core.domain.user.SproutUserEntity;

@Projection(types= {SproutUserEntity.class})
public interface DefaultUserProjection extends SproutUser {

	@Override
	default String getPassword() {
		return "[HIDDEN]";
	}
}
