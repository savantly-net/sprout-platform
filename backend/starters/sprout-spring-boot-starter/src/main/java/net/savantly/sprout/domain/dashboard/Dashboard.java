package net.savantly.sprout.domain.dashboard;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

import javax.persistence.CollectionTable;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OrderColumn;
import javax.persistence.PrePersist;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;
import net.savantly.sprout.core.domain.versioning.StringVersionedId;
import net.savantly.sprout.core.tenancy.TenantedVersionedDomainObject;
import net.savantly.sprout.domain.dashboard.link.DashboardLink;
import net.savantly.sprout.domain.dashboard.panel.Panel;

@Entity
@Accessors(chain = true)
@Getter @Setter
@Table(name = "DASHBOARDS")
public class Dashboard extends TenantedVersionedDomainObject {

	private final static long serialVersionUID = 1L;
	
	private boolean editable;
	private String title;
	private boolean deleted;
	private String folder;
	
	@ElementCollection(fetch=FetchType.EAGER)
	@CollectionTable(name = "DASHBOARD_LINKS")
	@OrderColumn(name = "index_id")
	private List<DashboardLink> links = new ArrayList<>();
	

	@ElementCollection(fetch=FetchType.EAGER)
	@CollectionTable(name = "DASHBOARD_PANELS")
	@OrderColumn(name = "index_id")
	private List<Panel> panels = new ArrayList<>();
	
	private long schemaVersion;

	@ElementCollection(fetch=FetchType.EAGER)
	@CollectionTable(name = "DASHBOARD_TAGS")
	@OrderColumn(name = "index_id")
	private List<String> tags = new ArrayList<String>();
	
	private boolean hideControls;
	
	@PrePersist
	public void prePersist() {
		if(Objects.isNull(this.getId())) {
			this.setId(new StringVersionedId());
		}
		if(Objects.isNull(this.getId().getId())) {
			this.getId().setId(UUID.randomUUID().toString());
		}
		if(Objects.isNull(this.getId().getVersion())) {
			this.getId().setVersion(0L);
		}
	}
	
}
