package net.savantly.sprout.domain.folder;

import javax.persistence.Entity;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;
import net.savantly.sprout.core.tenancy.TenantKeyedEntity;

@Entity
@Accessors(chain = true)
@Getter @Setter
public class Folder extends TenantKeyedEntity {
	
	private String name;
	private String parent;
	private String icon;

}
