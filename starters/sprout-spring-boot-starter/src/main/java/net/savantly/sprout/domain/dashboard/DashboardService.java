package net.savantly.sprout.domain.dashboard;

import java.io.IOException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import net.savantly.sprout.autoconfigure.properties.SproutConfigurationProperties;
import net.savantly.sprout.core.domain.versioning.StringVersionedId;
import net.savantly.sprout.core.domain.versioning.VersionedId;
import net.savantly.sprout.domain.dashboard.panel.PanelService;
import net.savantly.sprout.domain.uiProperties.UIProperty;
import net.savantly.sprout.domain.uiProperties.UIPropertyRepository;
import net.savantly.sprout.domain.uiProperties.WellKnownUIProp;
import net.savantly.sprout.starter.versioning.VersionedObjectBackendIdConverter;

@Service
public class DashboardService {
	
	private final static Logger log = LoggerFactory.getLogger(DashboardService.class);
	private final String defaultDashboardResourcePath = "classpath:/META-INF/dashboards/home.json";

	@Autowired
	private PanelService panelService;
	@Autowired
	private DashboardRepository repo;
	@Autowired
	private UIPropertyRepository propRepo;
	@Autowired
	private ResourceLoader resourceLoader;
	@Autowired
	private SproutConfigurationProperties props;
	@Autowired
	private ObjectMapper mapper;
	@Autowired
	private VersionedObjectBackendIdConverter converter;
	
	public DashboardDtoWrapper saveDashboard(DashboardSaveRequest dto) {
		Dashboard tempEntity = fromDto(dto);
		if(this.repo.existsById(tempEntity.getId())) {
			// bump the version
			tempEntity.getId().setVersion(tempEntity.getId().getVersion()+1);
		}
		Dashboard entity = this.repo.save(tempEntity);
		return toDto(entity);
	}
	
	public DashboardDtoWrapper getByUid(String uid) {
		Dashboard entity = this.repo.getOne((VersionedId) converter.fromRequestId(uid, Dashboard.class));
		return toDto(entity);
	}

	public DashboardDtoWrapper getLatestById(String id) {
		List<Dashboard> dashboardSearchResult = this.repo.findByIdId(id);
		if(dashboardSearchResult.size() == 0) {
			throw notFound(id);
		} else if(dashboardSearchResult.size() == 1) {
			return toDto(dashboardSearchResult.get(0));
		} else {
			Optional<Dashboard> entity = dashboardSearchResult.stream().max((d1, d2) -> d1.getId().getVersion().compareTo(d2.getId().getVersion()));
			return toDto(entity.get());
		}
	}
	
	public DashboardDtoWrapper getHomeDashboard() {
		String name = WellKnownUIProp.HOME_DASHBOARD_ID.name();
		List<UIProperty> props = this.propRepo.findByName(name);
		if(props.isEmpty()) {
			Dashboard dashboard = addHomeDashboard();
			return toDto(dashboard);
		} else {
			UIProperty prop = props.get(0);
			return getLatestById(prop.getValue());
		}
	}
	
	public Resource getDefaultHomeDashboard() throws JsonParseException, JsonMappingException, IOException {
		return resourceLoader.getResource(defaultDashboardResourcePath);
	}
	
	public Dashboard addHomeDashboard() {
		Resource resource = resourceLoader.getResource(props.getDashboards().getHome());
		try {
			if(!resource.exists()) {
				log.error("resource doesn't exist: " + props.getDashboards().getHome() + ". loading default dashboard");
				resource = getDefaultHomeDashboard();
			}
			Dashboard dashboard = toEntity(mapper.readValue(resource.getInputStream(), DashboardDto.class));
			dashboard = this.repo.saveAndFlush(dashboard);
			StringVersionedId id = dashboard.getId();
			String name = WellKnownUIProp.HOME_DASHBOARD_ID.name();
			if(this.propRepo.findByName(name).isEmpty()) {
				UIProperty prop = new UIProperty();
				prop.setName(name);
				prop.setValue(id.getId());
				this.propRepo.save(prop);
			} else {
				UIProperty prop = this.propRepo.getOne(name);
				prop.setValue(id.getId());
				this.propRepo.saveAndFlush(prop);
			}
			return dashboard;
		} catch (JsonParseException e) {
			throw new RuntimeException("there was a problem parsing the home dashboard resource: " + props.getDashboards().getHome(), e);
		} catch (JsonMappingException e) {
			throw new RuntimeException("there was a problem mapping the home dashboard resource to an object: " + props.getDashboards().getHome(), e);
		} catch (IOException e) {
			throw new RuntimeException("there was an IO exception reading the home dashboard resource: " + props.getDashboards().getHome(), e);
		}
	}
	
	private Dashboard toEntity(DashboardDto dto) {
		Dashboard entity = new Dashboard()
			.setTitle(dto.getTitle())
			.setEditable(dto.isEditable())
			.setHideControls(dto.isHideControls())
			.setLinks(dto.getLinks())
			.setPanels(dto.getPanels().stream().map(p -> {
				try {
					return this.panelService.fromDto(p);
				} catch (JsonProcessingException e) {
					log.warn("invalid panel definition: " + p.toString());
				}
				return null;
			}).filter(p -> Objects.nonNull(p)).collect(Collectors.toList()))
			.setSchemaVersion(dto.getSchemaVersion())
			.setTags(dto.getTags());

		entity.setId(new StringVersionedId().setId(dto.getId()).setVersion(dto.getVersion()));
		return entity;
	}

	private DashboardDtoWrapper toDto(Dashboard entity) {
		DashboardDto dto = new DashboardDto()
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
				.setVersion(entity.getId().getVersion());
			return new DashboardDtoWrapper()
				.setDashboard(dto)
				.setMeta(createMetaData(dto));
	}

	// TODO: Get actual meta-data
	private DashboardMeta createMetaData(DashboardDto dto) {
		DashboardMeta meta = new DashboardMeta();
		return meta;
	}

	private Dashboard fromDto(DashboardSaveRequest dto) {
		Dashboard entity = toEntity(dto.getDashboard());
		return entity;
	}

	private RuntimeException notFound(String id) {
		return new EntityNotFoundException("dashboard with id: " + id + " not found");
	}
}
