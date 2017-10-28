package net.savantly.sprout.content.contentItem;

import java.io.IOException;

import javax.transaction.Transactional;

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
import net.savantly.sprout.core.content.contentItem.ContentItem;

@RestController
@RequestMapping("/rest/content")
@Transactional
public class ContentItemRestController {
	
	private ContentItemRenderer renderer;
	
	public ContentItemRestController(ContentItemRenderer renderer) {
		this.renderer = renderer;
	}
	
	@RequestMapping(value="/{id}", method=RequestMethod.GET)
	public ResponseEntity getContent(@PathVariable("id") ContentItem item) throws TemplateNotFoundException, MalformedTemplateNameException, ParseException, IOException, TemplateException {
		String renderedView = renderer.render(item);
		ResponseEntity<String> response = new ResponseEntity<String>(renderedView, HttpStatus.OK);
		return response;
	}

}
