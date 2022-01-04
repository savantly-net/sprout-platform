package net.savantly.sprout.core.domain.role;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.*;

import com.vladmihalcea.hibernate.type.json.JsonStringType;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;
import net.savantly.sprout.core.domain.PersistedDomainObject;
import net.savantly.sprout.core.domain.privilege.Privilege;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;

@Getter @Setter
@Entity(name="APP_ROLE")
//@Table(name="APP_ROLE", uniqueConstraints = {@UniqueConstraint(columnNames = {"name", "tenant_id"})})
@Table(name="APP_ROLE", uniqueConstraints = {@UniqueConstraint(columnNames = {"name"})})
@Accessors(chain = true)
@TypeDef(name = "json", typeClass = JsonStringType.class)
public class Role extends PersistedDomainObject{

    private String name;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name="APP_ROLE_APP_PRIVILEGE",
            joinColumns=
            @JoinColumn(name="APP_ROLE_ID", referencedColumnName="ID"),
            inverseJoinColumns=
            @JoinColumn(name="APP_PRIVILEGE_ID", referencedColumnName="ID")
    )
    @Column(columnDefinition = "json")
    @Type(type = "json")
    private Set<Privilege> privileges = new HashSet<>();


}
