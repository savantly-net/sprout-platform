package net.savantly.sprout.module.content;

import java.io.IOException;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;

import freemarker.core.ParseException;
import freemarker.template.MalformedTemplateNameException;
import freemarker.template.TemplateException;
import freemarker.template.TemplateNotFoundException;
import net.savantly.sprout.module.content.model.contentItem.ContentItem;
import net.savantly.sprout.module.content.model.contentItem.ContentItemRenderingChain;
import net.savantly.sprout.module.content.model.contentItem.ContentItemRepository;
import net.savantly.sprout.module.content.model.fieldType.FieldType;
import net.savantly.sprout.module.content.model.webPage.WebPage;
import net.savantly.sprout.module.content.model.webPage.WebPageRenderer;
import net.savantly.sprout.module.content.model.webPage.WebPageRepository;

@RestController
@RequestMapping("/api/content")
@Transactional
public class ContentApi {

	private final ObjectMapper mapper;
	private final ContentItemRenderingChain itemRenderer;
	private final WebPageRenderer pageRenderer;
	private final WebPageRepository pageRepository;
	private final ContentItemRepository contentItemRepository;
	
	
	public ContentApi(ContentItemRenderingChain itemRenderer, WebPageRenderer pageRenderer, WebPageRepository repository, ContentItemRepository contentItemRepository) {
		this.mapper = new ObjectMapper();
		this.mapper.enable(SerializationFeature.WRITE_ENUMS_USING_TO_STRING);
		this.itemRenderer = itemRenderer;
		this.pageRepository = repository;
		this.pageRenderer = pageRenderer;
		this.contentItemRepository = contentItemRepository;
	}
	
	@GetMapping({"/fieldTypes"})
	public String fieldTypes() throws JsonProcessingException {
		List<JsonNode> fieldTypes = new ArrayList<>();
		Arrays.stream(FieldType.values()).forEach((ft) -> {
			fieldTypes.add(ft.toJsonNode());
		});
		return mapper.writeValueAsString(fieldTypes);
	}
	
	@RequestMapping(value="/item/{id}", method=RequestMethod.GET)
	public ResponseEntity<String> getContent(@PathVariable("id") String id) throws TemplateNotFoundException, MalformedTemplateNameException, ParseException, IOException, TemplateException {
		StringWriter writer = new StringWriter();
		ContentItem item = this.contentItemRepository.findById(id).orElseThrow(()-> new EntityNotFoundException("id: " + id));
		itemRenderer.renderContentItem(item, writer);
		ResponseEntity<String> response = new ResponseEntity<String>(writer.toString(), HttpStatus.OK);
		return response;
	}
	
	@RequestMapping(value="/page/{id}", method=RequestMethod.GET)
	public ResponseEntity<String> getPage(@PathVariable("id") String id) throws TemplateNotFoundException, MalformedTemplateNameException, ParseException, IOException, TemplateException {
		WebPage item = this.pageRepository.findById(id).orElseThrow(()->new EntityNotFoundException("id: " + id));
		String renderedView = pageRenderer.render(item);
		ResponseEntity<String> response = new ResponseEntity<String>(renderedView, HttpStatus.OK);
		return response;
	}
	
	@RequestMapping(value="/home", method=RequestMethod.GET)
	public ResponseEntity<String> getHomePage() throws TemplateNotFoundException, MalformedTemplateNameException, ParseException, IOException, TemplateException {
		WebPage item = pageRepository.findHomePage();
		if(item == null) {
			return new ResponseEntity<String>("No Home page", HttpStatus.NOT_FOUND);
		} else {
			String renderedView = pageRenderer.render(item);
			ResponseEntity<String> response = new ResponseEntity<String>(renderedView, HttpStatus.OK);
			return response;
		}
	}

}
