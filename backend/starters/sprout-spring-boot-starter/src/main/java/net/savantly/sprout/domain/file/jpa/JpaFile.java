package net.savantly.sprout.domain.file.jpa;

import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;
import net.savantly.sprout.core.tenancy.TenantedPersistedDomainObject;
import net.savantly.sprout.domain.file.FileData;
import net.savantly.sprout.domain.file.FolderChainItem;

@Entity
@Table(name = "files", uniqueConstraints = { @UniqueConstraint(columnNames = { "tenant_id", "name", "parent" }) })
@Getter
@Setter
@Accessors(chain = true)
public class JpaFile extends TenantedPersistedDomainObject implements FileData, JpaFileSummary {

	@NotNull
	private String name;
	@JsonProperty("isDir")
	private boolean isDir;
	private ZonedDateTime modDate;
	private long childrenCount;
	private String color;
	private String icon;
	private String thumbnailUrl;
	private String parent;
	@Column(length = 100000000)
	private byte[] bytes;
	private long size;
	private String contentType;

	@Transient
	private String downloadUrl;
	@Transient
	private Set<FolderChainItem> folderChain = new HashSet<FolderChainItem>();
}
