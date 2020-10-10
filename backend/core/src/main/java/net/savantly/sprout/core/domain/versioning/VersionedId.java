package net.savantly.sprout.core.domain.versioning;

import java.io.Serializable;

public interface VersionedId<ID> extends Serializable {
	
	ID getId();
	Long getVersion();

}
