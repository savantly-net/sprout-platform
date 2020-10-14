package net.savantly.sprout.module.newsfeed.domain.category;

import javax.persistence.Entity;

import lombok.Getter;
import lombok.Setter;
import net.savantly.sprout.core.tenancy.TenantKeyedEntity;

@Entity
@Getter @Setter
public class NewsfeedCategory extends TenantKeyedEntity  {
	
	private String name;

}
