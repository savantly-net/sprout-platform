package net.savantly.sprout.domain.file.jpa;

import java.time.ZonedDateTime;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.persistence.UniqueConstraint;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;
import net.savantly.sprout.core.tenancy.TenantedPersistedDomainObject;
import net.savantly.sprout.domain.file.FileData;

@Entity
@Table(name = "files", uniqueConstraints = { @UniqueConstraint(columnNames = { "tenant_id", "name", "path" }) })
@Getter
@Setter
@Accessors(chain = true)
public class JpaFile extends TenantedPersistedDomainObject implements FileData, JpaFileSummary {

	private String name;
	private boolean dir;
	private ZonedDateTime modDate;
	private long childrenCount;
	private String color;
	private String icon;
	private String thumbnailUrl;
	private String path;
	private byte[] bytes;

	@Transient
	private String downloadUrl;
}
