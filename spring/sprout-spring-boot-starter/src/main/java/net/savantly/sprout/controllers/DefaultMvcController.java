package net.savantly.sprout.controllers;

import java.io.IOException;
import java.util.HashMap;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.support.ResourcePatternResolver;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.resource.ResourceHttpRequestHandler;

import com.fasterxml.jackson.databind.ObjectMapper;

import net.savantly.sprout.settings.UISettings;

@Controller
@RequestMapping("/")
public class DefaultMvcController {
	private final static Logger log = LoggerFactory.getLogger(DefaultMvcController.class);
	
	@Autowired
	ResourcePatternResolver resources;
	@Autowired
	ResourceHttpRequestHandler resourceHandler;
	@Autowired
	UISettings uiSettings;
	@Autowired
	ObjectMapper mapper;

	@RequestMapping({"", "index"})
	public ModelAndView index() throws IOException {
		String viewName = "ui/index";
		ModelAndView modelAndView = new ModelAndView(viewName);

		HashMap<String, Object> clientConfig = new HashMap<String, Object>();
		clientConfig.put("keywords", uiSettings.getKeywords());
		clientConfig.put("previewImage", uiSettings.getPreviewImage());
		clientConfig.put("showBanner", uiSettings.getShowBanner());
		clientConfig.put("siteBanner", uiSettings.getSiteBanner());
		clientConfig.put("siteDescription", uiSettings.getSiteDescription());
		clientConfig.put("siteName", uiSettings.getSiteName());
		clientConfig.put("siteTitle", uiSettings.getSiteTitle());
		clientConfig.put("siteUrl", uiSettings.getSiteUrl());
		
		modelAndView.addObject("clientConfig", clientConfig);
		modelAndView.addObject("clientConfigJson", mapper.writerWithDefaultPrettyPrinter().writeValueAsString(clientConfig));
		return modelAndView;
	}


	@RequestMapping({"/admin", "/admin/"})
	public ModelAndView admin() throws IOException {
		return adminView();
	}
	
	@RequestMapping({"/admin/{resourcePath:.*}"})
	public Object adminResources(@PathVariable("resourcePath") String resourcePath,
			HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		log.info(resourcePath);
		if(resourcePath.contains(".")) {
			resourceHandler.handleRequest(request, response);
			return null;
		} else {
			log.debug("returning admin/index view for request: {}", resourcePath);
			return adminView();
		}
	}
	
	private ModelAndView adminView() {
		String viewName = "admin/index";
		ModelAndView modelAndView = new ModelAndView(viewName);
		return modelAndView;
	}
}
