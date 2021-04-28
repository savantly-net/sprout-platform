package net.savantly.sprout.domain.panelsource;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Table;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;
import net.savantly.sprout.core.tenancy.TenantKeyedEntity;

@Entity
@Getter @Setter
@Table(name = "app_panel_source")
@Accessors(chain = true)
public class PanelSource extends TenantKeyedEntity {
	
	@Enumerated(EnumType.STRING)
	private PanelSourceType sourceType = PanelSourceType.VIEW;

	@Size(max = 255)
	@Column(length = 255)
	private String name;
	
	@Size(max = 255)
	@Column(length = 255)
	private String url;
	
	@Size(max = 64000)
	@Column(length = 64000)
	private String template;
	
	@Enumerated(EnumType.STRING)
	private PanelSourceTemplateType templateType;

}
