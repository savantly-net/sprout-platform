package net.savantly.sprout.core.domain.versioning;

import java.util.Objects;

import javax.persistence.EmbeddedId;
import javax.persistence.MappedSuperclass;
import javax.persistence.Transient;

import org.springframework.data.domain.Persistable;
import org.springframework.util.ClassUtils;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;
import net.savantly.sprout.core.domain.AbstractAuditableDomainObject;

@Accessors(chain = true)
@MappedSuperclass
public abstract class VersionedDomainObject extends AbstractAuditableDomainObject<StringVersionedId> {

	@EmbeddedId
	@Getter @Setter
	private StringVersionedId id;
	
	@Transient
	public String getUid() {
		if(Objects.nonNull(id)) {
			return String.format("%s_%s", this.id.getId(), this.id.getVersion());
		} else {
			return null;
		}
	}
	
    /**
     * Must be {@link Transient} in order to ensure that no JPA provider complains because of a missing setter.
     * 
     * @see org.springframework.data.domain.Persistable#isNew()
     */
    @Transient
    public boolean isNew() {
        return null == getId();
    }

    /*
     * (non-Javadoc)
     * 
     * @see java.lang.Object#toString()
     */
    @Override
    public String toString() {
        return String.format("Entity of type %s with id: %s", this.getClass().getName(), getId());
    }
	
    @Override
    public boolean equals(Object obj) {

        if (null == obj) {
            return false;
        }

        if (this == obj) {
            return true;
        }

        if (!getClass().equals(ClassUtils.getUserClass(obj))) {
            return false;
        }

        Persistable<?> that = (Persistable<?>) obj;

        return null == this.getId() ? false : this.getId().equals(that.getId());
    }
}
