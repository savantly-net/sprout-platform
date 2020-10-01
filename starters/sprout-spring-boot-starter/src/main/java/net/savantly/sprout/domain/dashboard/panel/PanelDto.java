package net.savantly.sprout.domain.dashboard.panel;

import java.util.HashMap;
import java.util.Map;

import javax.persistence.Embedded;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;
import net.savantly.sprout.domain.dashboard.grid.GridPosition;

@Accessors(chain = true)
@Getter @Setter
public class PanelDto {
	
private int id;
	
	@JsonProperty("type")
	private String type;
	
	private String title;
	
	@Embedded
	private GridPosition gridPos;
	
	private Map<String, Object> options;
	
	private String pluginVersion;

	@JsonIgnore
	private Map<String, Object> additionalProperties = new HashMap<String, Object>();

}
