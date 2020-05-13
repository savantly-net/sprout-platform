package net.savantly.sprout.core.security;

import java.io.Serializable;
import java.time.LocalDateTime;

import org.springframework.data.domain.Auditable;

import net.savantly.sprout.core.domain.user.SproutUser;

public interface SproutAuditable<ID extends Serializable> extends Auditable<SproutUser, ID, LocalDateTime> {

}
