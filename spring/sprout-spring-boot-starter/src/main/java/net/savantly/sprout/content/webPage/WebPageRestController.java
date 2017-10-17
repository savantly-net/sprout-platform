package net.savantly.sprout.content.webPage;

import java.io.IOException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import freemarker.core.ParseException;
import freemarker.template.MalformedTemplateNameException;
import freemarker.template.TemplateException;
import freemarker.template.TemplateNotFoundException;
import net.savantly.sprout.core.content.webPage.WebPage;

@RestController
@RequestMapping("/page")
public class WebPageRestController {

	private WebPageRenderer renderer;
	
	public WebPageRestController(WebPageRenderer renderer) {
		this.renderer = renderer;
	}
	
	@RequestMapping(value="/{id}", method=RequestMethod.GET)
	public ResponseEntity getPage(@PathVariable("id") WebPage item) throws TemplateNotFoundException, MalformedTemplateNameException, ParseException, IOException, TemplateException {
		String renderedView = renderer.render(item);
		ResponseEntity<String> response = new ResponseEntity<String>(renderedView, HttpStatus.OK);
		return response;
	}
}
