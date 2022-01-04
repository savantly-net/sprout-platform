package net.savantly.sprout.domain.folder;

import javax.persistence.Entity;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;
import net.savantly.sprout.core.domain.PersistedDomainObject;

@Entity
@Accessors(chain = true)
@Getter @Setter
public class Folder extends PersistedDomainObject {


	private String name;
	private String parent;
	private String icon;

}
