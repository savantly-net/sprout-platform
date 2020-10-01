package net.savantly.sprout.domain.dashboard.panel;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.Embedded;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;
import net.savantly.sprout.domain.dashboard.grid.GridPosition;

@Embeddable
@Accessors(chain = true)
@Getter @Setter
public class Panel {
	
	private int id;
	
	@Column(name = "panel_type")
	private String type;
	
	private String title;
	
	@Embedded
	private GridPosition gridPos;
	
	private String options;
	private String pluginVersion;
	
}
