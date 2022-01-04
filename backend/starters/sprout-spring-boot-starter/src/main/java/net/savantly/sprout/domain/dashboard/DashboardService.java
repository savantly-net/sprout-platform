package net.savantly.sprout.domain.dashboard;

import java.io.IOException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;

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
import net.savantly.sprout.domain.uiProperties.UIPropertyService;
import net.savantly.sprout.domain.uiProperties.WellKnownUIProp;
import net.savantly.sprout.starter.versioning.VersionedObjectBackendIdConverter;
import org.springframework.transaction.support.TransactionTemplate;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
@Transactional
public class DashboardService {

	private final static Logger log = LoggerFactory.getLogger(DashboardService.class);
	private final String defaultDashboardResourcePath = "classpath:/META-INF/dashboards/home.json";

	@Autowired
	private PanelService panelService;
	@Autowired
	private DashboardRepository repo;
	@Autowired
	private UIPropertyService uiProps;
	@Autowired
	private ResourceLoader resourceLoader;
	@Autowired
	private SproutConfigurationProperties props;
	@Autowired
	private ObjectMapper mapper;
	@Autowired
	private VersionedObjectBackendIdConverter converter;
	@Autowired
	private DashboardConverter dashboardConverter;
	@Autowired
	private TransactionTemplate transactionTemplate;


	public DashboardDtoWrapper saveDashboard(DashboardSaveRequest dto) {
		Dashboard tempEntity = fromDto(dto);
		if(this.repo.existsById(tempEntity.getId())) {
			// bump the version
			tempEntity.setVersion(tempEntity.getVersion()+1);
		}
		Dashboard entity = this.repo.save(tempEntity);
		return dashboardConverter.convert(entity);

//		return Mono.fromCallable(() -> transactionTemplate.execute(status -> {
//			Dashboard entity1 = this.repo.save(tempEntity);
//			return dashboardConverter.convert(entity1);
//		}));

	}

	public Boolean setCurrentVersionForId(String id, Long version) {
//		List<Dashboard> dashboardSearchResult = this.repo.findByIdId(id);
		Dashboard dashboardSearchResult = this.repo.findById(id).orElse(new Dashboard());
//		dashboardSearchResult.stream().forEach(d -> {
		StringVersionedId stringVersionedId = new StringVersionedId();
		stringVersionedId.setId(dashboardSearchResult.getId());
//			this.repo.setCurrentVersionForId(d.getVersion().equals(version), d.getId());
		this.repo.setCurrentVersionForId(dashboardSearchResult.getVersion().equals(version), stringVersionedId);
//		});
		return true;
	}

	public DashboardDtoWrapper getByUid(String uid) {
//		Dashboard entity = this.repo.getOne((VersionedId) converter.fromRequestId(uid, Dashboard.class));
		//Dashboard entity = this.repo.getOne(uid);
		//return dashboardConverter.convert(entity);
		return null;
	}

	public DashboardDtoWrapper getLatestById(String id) {
//		List<Dashboard> dashboardSearchResult = this.repo.findByIdId(id);
		Dashboard dashboardSearchResult = this.repo.findById(id).orElse(new Dashboard());
		if(dashboardSearchResult == null) {
			throw notFound(id);
		} else if(dashboardSearchResult != null) {
			return dashboardConverter.convert(dashboardSearchResult);
		} else {
//			Optional<Dashboard> entity = dashboardSearchResult.stream().max(Comparator.comparing(PersistedDomainObject::getVersion));
//			if (entity.isPresent()) {
//				return dashboardConverter.convert(entity.get());
//			}
			throw notFound(id);
		}
	}

	public DashboardDtoWrapper getCurrentById(String id) {
//		List<Dashboard> dashboardSearchResult = this.repo.findByIdId(id);
		Dashboard dashboardSearchResult = this.repo.findById(id).orElse(new Dashboard());
		if(dashboardSearchResult == null) {
			throw notFound(id);
		} else if(dashboardSearchResult != null) {
			return dashboardConverter.convert(dashboardSearchResult);
		} else {
//			Optional<Dashboard> entity = dashboardSearchResult.stream().filter(Dashboard::isCurrentVersion).findAny();
//			if (entity.isPresent()) {
//				return dashboardConverter.convert(entity.get());
//			}
			throw notFound(id);
		}
	}

	public Mono<DashboardDtoWrapper> getHomeDashboard() {
		Optional<UIProperty> prop = this.uiProps.getUIPropertyByName(WellKnownUIProp.HOME_DASHBOARD_ID);

		//Mono<UIProperty> propertyMono = this.uiProps.getUIPropertyByName(WellKnownUIProp.HOME_DASHBOARD_ID);

		if(prop.isPresent()) {
			Mono<DashboardDtoWrapper> mono = Mono.just(getCurrentById(prop.get().getValue()));
			return mono;
			//return getCurrentById(prop.get().getValue());
		} else {
			Dashboard dashboard = addHomeDashboard();
			Mono<DashboardDtoWrapper> mono = Mono.just(dashboardConverter.convert(dashboard));
			return mono;
			//return dashboardConverter.convert(dashboard);

		}
	}

	public Flux<DashboardDtoWrapper> getDashboardsByFolder(String folder) {
		List<Dashboard> dashboards = this.repo.findByFolder(folder);
		Flux<Dashboard> dashboardFlux = Flux.defer(() -> Flux.fromIterable(dashboards));
		return dashboardFlux.map(dashboardConverter::convert);
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
			dashboard = this.repo.save(dashboard);
			StringVersionedId stringVersionedId = new StringVersionedId();
			stringVersionedId.setId(dashboard.getId());
			StringVersionedId id = stringVersionedId;
//			StringVersionedId id = dashboard.getId();
			uiProps.saveUIProperty(WellKnownUIProp.HOME_DASHBOARD_ID, id.getId());
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
				.setFolder(dto.getFolderId())
				.setTitle(dto.getTitle())
				.setEditable(dto.isEditable())
				.setHideControls(dto.isHideControls())
				.setCurrentVersion(dto.isCurrentVersion())
				.setLinks(dto.getLinks())
				.setMessage(dto.getMessage())
				.setPanels(dto.getPanels().stream().map(p -> {
					try {
						return this.panelService.fromDto(p);
					} catch (JsonProcessingException e) {
						log.warn("invalid panel definition: " + p.toString());
					}
					return null;
				}).filter(p -> Objects.nonNull(p)).collect(Collectors.toList()))
				.setSchemaVersion(dto.getSchemaVersion())
				.setTags(dto.getTags())
				.setDeleted(dto.isDeleted());

		entity.setId(new StringVersionedId().setId(dto.getId()).setVersion(dto.getVersion()).toString());
		return entity;
	}


	private Dashboard fromDto(DashboardSaveRequest dto) {
		Dashboard entity = toEntity(dto.getDashboard());
		return entity;
	}

	private RuntimeException notFound(String id) {
		return new EntityNotFoundException("dashboard with id: " + id + " not found");
	}

}
