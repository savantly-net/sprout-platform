package net.savantly.sprout.content.contentItem;

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
import net.savantly.sprout.core.content.contentItem.ContentItem;

@RestController
@RequestMapping("/content")
public class ContentItemRestController {
	
	private ContentItemRenderer renderer;
	
	public ContentItemRestController(ContentItemRenderer renderer) {
		this.renderer = renderer;
	}
	
	@RequestMapping(value="{id}", method=RequestMethod.GET)
	public ResponseEntity getContent(@PathVariable("id") ContentItem item) throws TemplateNotFoundException, MalformedTemplateNameException, ParseException, IOException, TemplateException {
		String renderedView = renderer.render(item);
		ResponseEntity<String> response = new ResponseEntity<String>(renderedView, HttpStatus.OK);
		return response;
	}
	
/*	@RequestMapping(value="", method=RequestMethod.POST)
	public ResponseEntity addContent(@RequestBody ContentItem item) {
		item = repository.save(item);
		ResponseEntity<ContentItem> response = new ResponseEntity<ContentItem>(item, HttpStatus.CREATED);
		return response;
	}
	
	@RequestMapping(value="{id}", method= {RequestMethod.PUT})
	public ResponseEntity updateContent(@RequestBody ContentItem item, @PathVariable("id") String id) {
		item = repository.save(item);
		ResponseEntity<ContentItem> response = new ResponseEntity<ContentItem>(item, HttpStatus.ACCEPTED);
		return response;
	}
	
	@RequestMapping(value="{id}", method= {RequestMethod.DELETE})
	public ResponseEntity deleteContent(@PathVariable("id") ContentItem item) {
		repository.delete(item);
		ResponseEntity response = new ResponseEntity(HttpStatus.ACCEPTED);
		return response;
	}*/

}
