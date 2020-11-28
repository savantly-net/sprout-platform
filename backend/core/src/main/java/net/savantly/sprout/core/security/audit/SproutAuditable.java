package net.savantly.sprout.core.security.audit;

import java.io.Serializable;
import java.time.ZonedDateTime;

import org.springframework.data.domain.Auditable;

public interface SproutAuditable<ID extends Serializable> extends Auditable<String, ID, ZonedDateTime> {

}