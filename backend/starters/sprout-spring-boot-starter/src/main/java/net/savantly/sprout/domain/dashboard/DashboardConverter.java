package net.savantly.sprout.domain.dashboard;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.fasterxml.jackson.core.JsonProcessingException;

import net.savantly.sprout.domain.dashboard.panel.PanelService;

@Transactional
public class DashboardConverter {
	private final static Logger log = LoggerFactory.getLogger(DashboardConverter.class);

	private final PanelService panelService;
	
	public DashboardConverter(PanelService panelService) {
		this.panelService = panelService;
	}
	
	public List<DashboardDtoWrapper> convert(List<Dashboard> entities) {
		return entities.stream().map(d -> convert(d)).collect(Collectors.toList());
	}
	
	public DashboardDtoWrapper convert(Dashboard entity) {
		DashboardDto dto = new DashboardDto()
				.setFolderId(entity.getFolder())
				.setTitle(entity.getTitle())
				.setEditable(entity.isEditable())
				.setHideControls(entity.isHideControls())
				.setLinks(entity.getLinks())
				.setPanels(entity.getPanels().stream().map(p -> {
					try {
						return this.panelService.toDto(p);
					} catch (JsonProcessingException e) {
						log.warn("invalid panel definition: " + p.toString());
					}
					return null;
				}).filter(p -> Objects.nonNull(p)).collect(Collectors.toList()))
				.setSchemaVersion(entity.getSchemaVersion())
				.setTags(entity.getTags())
				.setId(entity.getId().getId())
				.setUid(entity.getUid())
				.setVersion(entity.getId().getVersion())
				.setDeleted(entity.isDeleted());
			return new DashboardDtoWrapper()
				.setDashboard(dto)
				.setMeta(createMetaData(dto));
	}


	// TODO: Get actual meta-data
	private DashboardMeta createMetaData(DashboardDto dto) {
		DashboardMeta meta = new DashboardMeta();
		return meta;
	}

}
