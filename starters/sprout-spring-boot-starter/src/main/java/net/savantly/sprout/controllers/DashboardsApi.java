package net.savantly.sprout.controllers;

import java.io.IOException;
import java.util.Objects;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.websocket.server.PathParam;

import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import net.savantly.sprout.autoconfigure.properties.SproutConfigurationProperties;
import net.savantly.sprout.domain.dashboard.DashboardDtoWrapper;
import net.savantly.sprout.domain.dashboard.DashboardSaveRequest;
import net.savantly.sprout.domain.dashboard.DashboardSaveResponse;
import net.savantly.sprout.domain.dashboard.DashboardService;

@RequestMapping("/api/dashboards")
@RestController
public class DashboardsApi {
	
	private SproutConfigurationProperties props;
	private ResourceLoader resourceLoader;
	private DashboardService service;
    private ServletContext servletContext;


	public DashboardsApi(
			ServletContext servletContext,
			SproutConfigurationProperties props, 
			ResourceLoader resourceLoader,
			DashboardService service) {
		this.servletContext = servletContext;
		this.props = props;
		this.resourceLoader = resourceLoader;
		this.service = service;
	}

	@GetMapping("/home")
	public ResponseEntity<DashboardDtoWrapper> getHome() throws IOException{
	    return ResponseEntity.ok()
	            .contentType(MediaType.APPLICATION_JSON)
	            .body(service.getHomeDashboard());
	}
	
	@PostMapping("/db")
	public DashboardSaveResponse saveDashboard(@RequestBody DashboardSaveRequest dto, HttpServletRequest request) {
		DashboardDtoWrapper saved = this.service.saveDashboard(dto);
		return toSaveResponse(saved);
	}
	

	@GetMapping({"/uid/:uid", "/uid/:uid/:slug"})
	public DashboardDtoWrapper getDashboard(@PathParam("uid") String uuid) {
		DashboardDtoWrapper saved = this.service.getByUid(uuid);
		setMetaDashboardUrl(saved);
		return saved;
	}
	
	private void setMetaDashboardUrl(DashboardDtoWrapper dto) {

		dto.getMeta().setUrl(servletContext.getContextPath() + "/api/dashboards/uuid/" + dto.getDashboard().getUid());
	}
	

	private DashboardSaveResponse toSaveResponse(DashboardDtoWrapper saved) {
		String slug = createSlug(saved);
		return new DashboardSaveResponse()
			.setId(saved.getDashboard().getId())
			.setSlug(slug)
			.setStatus("saved")
			.setUid(saved.getDashboard().getUid())
			.setUrl(servletContext.getContextPath() + "/d/" + saved.getDashboard().getUid() + "/" + slug)
			.setVersion(saved.getDashboard().getVersion());
	}

	private String createSlug(DashboardDtoWrapper dto) {
		String title = dto.getDashboard().getTitle();
		if (Objects.nonNull(title) && !title.isEmpty()) {
			return title.replace(" ", "-").toLowerCase();
		} else {
			return "untitled";
		}
	}
}
