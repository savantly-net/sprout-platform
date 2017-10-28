package net.savantly.sprout.content.webPage;

import java.io.IOException;

import javax.transaction.Transactional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import freemarker.core.ParseException;
import freemarker.template.MalformedTemplateNameException;
import freemarker.template.TemplateException;
import freemarker.template.TemplateNotFoundException;
import net.savantly.sprout.core.content.webPage.WebPage;
import net.savantly.sprout.core.content.webPage.WebPageRepository;

@RestController
@RequestMapping("/rest/pages")
@Transactional
public class WebPageRestController {

	private WebPageRenderer renderer;
	private WebPageRepository repository;
	
	public WebPageRestController(WebPageRenderer renderer, WebPageRepository repository) {
		this.renderer = renderer;
		this.repository = repository;
	}
	
	@RequestMapping(value="/{id}", method=RequestMethod.GET)
	public ResponseEntity getPage(@PathVariable("id") WebPage item) throws TemplateNotFoundException, MalformedTemplateNameException, ParseException, IOException, TemplateException {
		Assert.notNull(item, "WebPage was not found");
		String renderedView = renderer.render(item);
		ResponseEntity<String> response = new ResponseEntity<String>(renderedView, HttpStatus.OK);
		return response;
	}
	
	@RequestMapping(value="/home", method=RequestMethod.GET)
	public ResponseEntity getHomePage() throws TemplateNotFoundException, MalformedTemplateNameException, ParseException, IOException, TemplateException {
		WebPage item = repository.findHomePage();
		if(item == null) {
			return new ResponseEntity<String>("No Home page", HttpStatus.NOT_FOUND);
		} else {
			String renderedView = renderer.render(item);
			ResponseEntity<String> response = new ResponseEntity<String>(renderedView, HttpStatus.OK);
			return response;
		}
	}
}
