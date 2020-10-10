package net.savantly.sprout.core.domain.versioning;

import javax.persistence.Column;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

@Accessors(chain = true)
@Getter @Setter
@EqualsAndHashCode
public class StringVersionedId implements VersionedId<String> {

	private static final long serialVersionUID = 1L;
	
	@Column(name = "id", nullable = false)
	private String id;
	
    @Column(name = "ITEM_VERSION", updatable = false)
	private Long version;

	@Override
	public String toString() {
		return String.format("%s_%s", id, version);
	}
}
