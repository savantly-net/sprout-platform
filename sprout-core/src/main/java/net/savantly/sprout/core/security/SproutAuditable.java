package net.savantly.sprout.core.security;

import java.io.Serializable;
import java.time.LocalDateTime;

import org.springframework.data.domain.Auditable;

public interface SproutAuditable<ID extends Serializable> extends Auditable<String, ID, LocalDateTime> {

}
