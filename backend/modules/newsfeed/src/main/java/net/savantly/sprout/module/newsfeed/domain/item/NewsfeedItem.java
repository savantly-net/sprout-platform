package net.savantly.sprout.module.newsfeed.domain.item;

import javax.persistence.Entity;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;
import net.savantly.sprout.core.tenancy.TenantKeyedEntity;

@Entity
@Getter @Setter
@Accessors(chain = true)
public class NewsfeedItem extends TenantKeyedEntity {

	private String title;
	private String description;
}
