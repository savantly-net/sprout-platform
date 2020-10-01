package net.savantly.sprout.core.domain.versioning;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

@Accessors(chain = true)
@Getter @Setter
@EqualsAndHashCode
public class LongVersionedId implements VersionedId<Long>{

	private static final long serialVersionUID = 1L;
	private Long id;
	private Long version;
}
