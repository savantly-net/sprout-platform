package net.savantly.sprout.controllers;

import java.io.IOException;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.support.ResourcePatternResolver;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.MatrixVariable;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.NoHandlerFoundException;
import org.springframework.web.servlet.resource.ResourceHttpRequestHandler;

import com.fasterxml.jackson.databind.ObjectMapper;

import net.savantly.sprout.settings.UISettings;

@Controller
@RequestMapping(path="/", produces="!application/json")
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

	@RequestMapping({ "", "index" })
	public ModelAndView index() throws IOException {
		String viewName = "ui/index";
		ModelAndView modelAndView = new ModelAndView(viewName);		
		modelAndView.addObject("clientConfig", uiSettings);
		return modelAndView;
	}

	// Match paths that contain the 'matrix' parameter style that angular uses
	// rejects requests that are for json, so we dont accidently respond to an api request
	@RequestMapping(path={"*{variables}"}, produces = "!application/json")
	public ModelAndView index(@MatrixVariable Map<String, String> variables, HttpServletRequest request) throws IOException {
		if(!variables.isEmpty()) {
			log.debug("Found matrix variables: ", variables);
		}
		String viewName = "ui/index";
		ModelAndView modelAndView = new ModelAndView(viewName);		
		modelAndView.addObject("clientConfig", uiSettings);
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
	
	@ExceptionHandler(NoHandlerFoundException.class)
	public ModelAndView handleNoHandlerFound(
            HttpServletRequest request,
            HttpServletResponse response,
            NoHandlerFoundException exception) throws IOException {

		String viewName = "ui/index";
		ModelAndView modelAndView;
		
		log.warn(exception.getLocalizedMessage());
		if (request.getRequestURI().contains("/admin/")) {
			viewName = "admin/index";	
		}

		modelAndView = new ModelAndView(viewName);	
		modelAndView.addObject("clientConfig", uiSettings);
		return modelAndView;
	}
	
	private ModelAndView adminView() {
		String viewName = "admin/index";
		ModelAndView modelAndView = new ModelAndView(viewName);
		return modelAndView;
	}
}
