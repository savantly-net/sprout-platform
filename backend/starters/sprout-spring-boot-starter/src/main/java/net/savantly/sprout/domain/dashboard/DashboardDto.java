package net.savantly.sprout.domain.dashboard;

import java.util.ArrayList;
import java.util.List;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;
import net.savantly.sprout.domain.dashboard.link.DashboardLink;
import net.savantly.sprout.domain.dashboard.panel.PanelDto;

@Accessors(chain = true)
@Getter @Setter
@EqualsAndHashCode(exclude = {"links", "panels", "tags"})
public class DashboardDto {

	private String id;
	private String uid;
	private Long version;
	private String title;
	private boolean editable;
	private List<DashboardLink> links = new ArrayList<>();
	private List<PanelDto> panels = new ArrayList<>();
	private long schemaVersion;
	private List<String> tags = new ArrayList<String>();
	private boolean hideControls;
}
