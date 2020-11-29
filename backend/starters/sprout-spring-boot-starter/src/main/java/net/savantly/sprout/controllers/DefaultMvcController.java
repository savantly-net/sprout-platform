package net.savantly.sprout.controllers;

import java.io.IOException;
import java.util.Optional;

import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.servlet.HandlerMapping;

@Controller
@Transactional
public class DefaultMvcController {
	private final static Logger log = LoggerFactory.getLogger(DefaultMvcController.class);
	
	private final static String nonStaticFilePattern = "{path:[^.][\\w]{1,10}$}";
	
	@Autowired
	@Qualifier("resourceHandlerMapping")
	private HandlerMapping handlerMapping;

	@GetMapping({ "", "/"})
	public String index() throws IOException {
		return "index";
	}

	/**
	 * Catch subfolder requests to redirect to admin/index view. 
	 * This lets the SPA handle the routes
	 * @param path
	 * @return
	 */
	@GetMapping(path = {"/admin/", 
			"/admin/" + nonStaticFilePattern, 
			"/admin/*/" + nonStaticFilePattern, 
			"/admin/*/*/" + nonStaticFilePattern, 
			"/admin/*/*/*/" + nonStaticFilePattern, 
			"/admin/*/*/*/*/" + nonStaticFilePattern, 
			"/admin/*/*/*/*/*/" + nonStaticFilePattern, 
			"/admin/*/*/*/*/*/*/" + nonStaticFilePattern})
	@PreAuthorize("hasAuthority('GENERAL_ADMIN')")
	public String admin(@PathVariable(required = false, name = "path") Optional<String> path) {
		
		/*
		 * manual static resource return
		 * Do we need this anywhere?
		if(path.isPresent()) {
			
			if(isStaticFileRequest(path.get())) {
				AbstractHandlerMapping resourceHandlerMapping = (AbstractHandlerMapping)handlerMapping;
				HandlerExecutionChain handlerChain = resourceHandlerMapping.getHandler(request);
				ResourceHttpRequestHandler resourceHandler = (ResourceHttpRequestHandler) handlerChain.getHandler();
				resourceHandler.handleRequest(request, response);
			}
		}
		*/
		return "admin/index";
	}


	@GetMapping({"/error*"})
	public String error() throws IOException {
		return "error";
	}
}
