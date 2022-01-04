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
import net.savantly.sprout.core.domain.PersistedDomainObject;
import net.savantly.sprout.core.domain.versioning.StringVersionedId;

import net.savantly.sprout.domain.dashboard.link.DashboardLink;
import net.savantly.sprout.domain.dashboard.panel.Panel;

@Entity
@Accessors(chain = true)
@Getter @Setter
@Table(name = "DASHBOARDS")
public class Dashboard extends PersistedDomainObject {

	private static final long serialVersionUID = 1L;

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
	private List<String> tags = new ArrayList<>();

	private boolean hideControls;
	private boolean currentVersion;
	private String message;

	@PrePersist
	public void prePersist() {
		if(Objects.isNull(this.getId())) {
			this.setId(new StringVersionedId().toString());
		}
		if(Objects.isNull(this.getId())) {
			this.setId(UUID.randomUUID().toString());
		}
		if(Objects.isNull(this.getVersion())) {
			this.setVersion(0L);
		}
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || getClass() != o.getClass()) return false;
		if (!super.equals(o)) return false;
		Dashboard dashboard = (Dashboard) o;
		return editable == dashboard.editable && deleted == dashboard.deleted && schemaVersion == dashboard.schemaVersion && hideControls == dashboard.hideControls && currentVersion == dashboard.currentVersion && Objects.equals(title, dashboard.title) && Objects.equals(folder, dashboard.folder) && Objects.equals(links, dashboard.links) && Objects.equals(panels, dashboard.panels) && Objects.equals(tags, dashboard.tags) && Objects.equals(message, dashboard.message);
	}

	@Override
	public int hashCode() {
		return Objects.hash(super.hashCode(), editable, title, deleted, folder, links, panels, schemaVersion, tags, hideControls, currentVersion, message);
	}
}
