package net.savantly.sprout.controllers;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import net.savantly.sprout.autoconfigure.properties.SproutConfigurationProperties;

@RequestMapping("/api/dashboards")
@RestController
public class DashboardsApi {
	
	private SproutConfigurationProperties props;
	private ResourceLoader resourceLoader;


	public DashboardsApi(SproutConfigurationProperties props, ResourceLoader resourceLoader) {
		this.props = props;
		this.resourceLoader = resourceLoader;
	}

	@GetMapping("/home")
	public ResponseEntity<Resource> getHome() throws IOException{
		Resource resource = resourceLoader.getResource(props.getDashboards().getHome());

	    return ResponseEntity.ok()
	            .contentType(MediaType.APPLICATION_JSON)
	            .body(resource);
	}
}
