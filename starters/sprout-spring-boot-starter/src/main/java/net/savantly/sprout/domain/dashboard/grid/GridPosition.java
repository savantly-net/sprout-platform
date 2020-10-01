package net.savantly.sprout.domain.dashboard.grid;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

@Accessors(chain = true)
@Getter @Setter
@Embeddable
public class GridPosition {

	@Column(name = "grid_x")
	private int x;
	@Column(name = "grid_y")
	private int y;
	@Column(name = "grid_w")
	private int w;
	@Column(name = "grid_h")
	private int h;
	
}
