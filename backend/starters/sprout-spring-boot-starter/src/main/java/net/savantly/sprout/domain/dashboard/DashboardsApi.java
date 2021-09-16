package net.savantly.sprout.domain.dashboard;

import java.io.IOException;
import java.util.List;
import java.util.Objects;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api/dashboards")
@RestController
@Transactional
public class DashboardsApi {
	
	private DashboardService service;
    private ServletContext servletContext;


	public DashboardsApi(
			ServletContext servletContext,
			DashboardService service) {
		this.servletContext = servletContext;
		this.service = service;
	}

	@PreAuthorize("hasAuthority('DASHBOARD_READ')")
	@GetMapping({"/folder/", "/folder/{folder}"})
	public ResponseEntity<List<DashboardDtoWrapper>> getDashboards(@PathVariable(name = "folder", required = false) String folder) throws IOException{
	    return ResponseEntity.ok()
	            .contentType(MediaType.APPLICATION_JSON)
	            .body(service.getDashboardsByFolder(folder));
	}
	
	@GetMapping("/home")
	public ResponseEntity<DashboardDtoWrapper> getHome() throws IOException{
	    return ResponseEntity.ok()
	            .contentType(MediaType.APPLICATION_JSON)
	            .body(service.getHomeDashboard());
	}
	
	@PreAuthorize("hasAuthority('DASHBOARD_EDIT')")
	@PostMapping("/db")
	public DashboardSaveResponse saveDashboard(@RequestBody DashboardSaveRequest dto, HttpServletRequest request) {
		DashboardDtoWrapper saved = this.service.saveDashboard(dto);
		return toSaveResponse(saved);
	}

	@PreAuthorize("hasAuthority('DASHBOARD_EDIT')")
	@PostMapping("/db/set-current/{id}/{version}")
	public Boolean setCurrentVersionForId(@PathVariable("id") String id, @PathVariable("version") Long version) {
		return this.service.setCurrentVersionForId(id, version);
	}
	
	// Should we add this??
	//@PreAuthorize("hasAuthority('DASHBOARD_READ')")
	@GetMapping({"/uid/{uid}"})
	public DashboardDtoWrapper getDashboard(@PathVariable("uid") String uid) {
		DashboardDtoWrapper saved = this.service.getByUid(uid);
		setMetaDashboardUrl(saved);
		return saved;
	}

	@PreAuthorize("hasAuthority('DASHBOARD_DELETE')")
	@DeleteMapping({"/uid/{uid}"})
	public DashboardDtoWrapper deleteDashboard(@PathVariable("uid") String uid) {
		DashboardDtoWrapper existing = this.service.getByUid(uid);
		DashboardSaveRequest request = new DashboardSaveRequest().setDashboard(existing.getDashboard().setDeleted(true));
		DashboardDtoWrapper saved = this.service.saveDashboard(request);
		setMetaDashboardUrl(saved);
		return saved;
	}
	
	private void setMetaDashboardUrl(DashboardDtoWrapper dto) {

		dto.getMeta().setUrl(servletContext.getContextPath() + "/api/dashboards/uid/" + dto.getDashboard().getUid());
	}
	

	private DashboardSaveResponse toSaveResponse(DashboardDtoWrapper saved) {
		String slug = createSlug(saved);
		return new DashboardSaveResponse()
			.setId(saved.getDashboard().getId())
			.setSlug(slug)
			.setStatus("success")
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
