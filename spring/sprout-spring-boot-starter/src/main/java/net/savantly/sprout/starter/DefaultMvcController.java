package net.savantly.sprout.starter;

import java.io.IOException;
import java.net.URI;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.core.io.support.ResourcePatternResolver;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.resource.ResourceHttpRequestHandler;

@Controller
@RequestMapping("/")
public class DefaultMvcController {
	private final static Logger log = LoggerFactory.getLogger(DefaultMvcController.class);
	
	@Autowired
	ResourcePatternResolver resources;
	@Autowired
	ResourceHttpRequestHandler resourceHandler;

	@RequestMapping({"", "index"})
	public ModelAndView index() throws IOException {
		String viewName = "ui/index";
		ModelAndView modelAndView = new ModelAndView(viewName);
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
