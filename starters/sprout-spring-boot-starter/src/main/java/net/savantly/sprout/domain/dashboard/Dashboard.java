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

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;
import net.savantly.sprout.core.domain.versioning.TenantedVersionedDomainObject;
import net.savantly.sprout.domain.dashboard.link.DashboardLink;
import net.savantly.sprout.domain.dashboard.panel.Panel;

@Entity
@Accessors(chain = true)
@Getter @Setter
public class Dashboard extends TenantedVersionedDomainObject {

	private final static long serialVersionUID = 1L;
	
	private boolean editable;
	
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
		if(Objects.isNull(this.getVersion())) {
			this.setVersion(0L);
		}
		if(Objects.isNull(this.getUid()) || this.getUid().isEmpty()) {
			this.setUid(UUID.randomUUID().toString());
		}
	}
	
}
