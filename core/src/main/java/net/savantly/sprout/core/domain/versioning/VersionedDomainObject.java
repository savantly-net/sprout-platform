package net.savantly.sprout.core.domain.versioning;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.MappedSuperclass;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.NotBlank;

import org.springframework.data.domain.Persistable;
import org.springframework.util.ClassUtils;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;
import net.savantly.sprout.core.domain.AbstractAuditableDomainObject;

@Accessors(chain = true)
@MappedSuperclass
@IdClass(LongVersionedId.class)
@Table(uniqueConstraints = {
	@UniqueConstraint(columnNames = {"UUID"})
})
public abstract class VersionedDomainObject extends AbstractAuditableDomainObject<Long> {

	@Id
	@Getter @Setter
    @GeneratedValue
	private Long id;
	
	@Id
	@Getter @Setter
	private Long version;
	
	@NotBlank
	@Getter @Setter
    @Column(name = "uid", columnDefinition = "VARCHAR(36)")
	private String uid;
	
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
