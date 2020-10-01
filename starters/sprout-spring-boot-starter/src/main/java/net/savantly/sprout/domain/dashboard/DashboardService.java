package net.savantly.sprout.domain.dashboard;

import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;

import net.savantly.sprout.domain.dashboard.panel.PanelService;

@Service
public class DashboardService {
	
	private final static Logger log = LoggerFactory.getLogger(DashboardService.class);

	@Autowired
	private PanelService panelService;
	@Autowired
	private DashboardRepository repo;
	
	public DashboardDtoWrapper saveDashboard(DashboardSaveRequest dto) {
		Dashboard entity = this.repo.save(fromDto(dto));
		return toDto(entity);
	}
	
	public DashboardDtoWrapper getByUuid(String uuid) {
		Dashboard entity = this.repo.findOneByUid(uuid);
		return toDto(entity);
	}
	
	public DashboardDtoWrapper getLatestById(Long id) {
		Optional<Dashboard> entity = this.repo.findById(id).stream().max((d1, d2) -> d1.getVersion().compareTo(d2.getVersion()));
		if(entity.isPresent()) {
			return toDto(entity.get());
		} else {
			throw new EntityNotFoundException("dashboard with id: " + id + " not found");
		}
		
	}
	
	private DashboardDtoWrapper toDto(Dashboard entity) {
		DashboardDto dto = new DashboardDto()
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
				.setId(entity.getId())
				.setUid(entity.getUid())
				.setVersion(entity.getVersion());
			return new DashboardDtoWrapper()
				.setDashboard(dto)
				.setMeta(new DashboardMeta());
	}

	private Dashboard fromDto(DashboardSaveRequest dto) {
		Dashboard entity = new Dashboard()
			.setEditable(dto.getDashboard().isEditable())
			.setHideControls(dto.getDashboard().isHideControls())
			.setLinks(dto.getDashboard().getLinks())
			.setPanels(dto.getDashboard().getPanels().stream().map(p -> {
				try {
					return this.panelService.fromDto(p);
				} catch (JsonProcessingException e) {
					log.warn("invalid panel definition: " + p.toString());
				}
				return null;
			}).filter(p -> Objects.nonNull(p)).collect(Collectors.toList()))
			.setSchemaVersion(dto.getDashboard().getSchemaVersion())
			.setTags(dto.getDashboard().getTags());
		

		entity.setId(dto.getDashboard().getId())
			.setVersion(dto.getDashboard().getVersion());
		return entity;
	}
}
