package net.savantly.sprout.module.content.model.webPage;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.HashMap;
import java.util.Map;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.webmvc.support.RepositoryEntityLinks;
import org.springframework.hateoas.Link;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import net.savantly.sprout.module.content.model.contentItem.ContentItemImpl;
import net.savantly.sprout.module.content.model.contentItem.ContentItemRepository;
import net.savantly.sprout.module.content.model.contentType.ContentTypeFixture;
import net.savantly.sprout.module.content.model.contentType.ContentTypeRepository;
import net.savantly.sprout.module.content.model.webPageLayout.WebPageLayout;
import net.savantly.sprout.module.content.model.webPageLayout.WebPageLayoutFixture;
import net.savantly.sprout.module.content.model.webPageLayout.WebPageLayoutRepository;

@SpringBootTest
@WebAppConfiguration
public class WebPageRestRepositoryTest {

	private static final Logger log = LoggerFactory.getLogger(WebPageRestRepositoryTest.class);
	private static final String webPageId = "WEBPAGE_TEST";

	@Autowired
	WebApplicationContext ctx;	
	@Autowired
	WebPageRepository repository;
	@Autowired
	WebPageLayoutRepository wplRepository;
	@Autowired
	ContentTypeRepository ctRepository;
	@Autowired
	ContentItemRepository ciRepository;
	@Autowired
	ObjectMapper mapper;
	@Autowired
	private RepositoryEntityLinks entityLinks;
	
	MockHttpServletRequest request = new MockHttpServletRequest();
	
	private MockMvc mvc;
	private ContentItemImpl contentItem;

	@BeforeEach
	public void setup() {
		mvc = MockMvcBuilders
				.webAppContextSetup(ctx)
				.build();

		RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));
	}
	
	@Test
	public void testRestApi() throws Exception {

		ContentItemImpl contentItem = new ContentItemImpl();
		contentItem.setContentType(ctRepository.findByName(ContentTypeFixture.defaultContentTypeName));
		this.contentItem = ciRepository.save(contentItem);
		
		// Create webPage
		JsonNode webPage = createWebPage();

		// Add webPageContent item
		JsonNode webPageContent = createWebPageContent(webPageId);
		
		// Add ContentItemImpl to webPageContent
		addContentItemToWebPageContent(webPageContent);	

		// assert there is 1 WebPageContent
		makeWebPageAssertions(webPage, 1);
		
		// remove it
		removeWebPageContents(webPage);
		// and assert it is gone
		makeWebPageAssertions(webPage, 0);
	}
	
	
	private void removeWebPageContents(JsonNode webPage) throws Exception {
		String contentItemsHref = webPage.get("_links").get("contentItems").get("href").asText();
		JsonNode webPageContentItems = getEntity(contentItemsHref); 
		for (JsonNode jsonNode : webPageContentItems.get("_embedded").get("webPageContents")) {
			log.info("jsonNode: {}", jsonNode);
			deleteEntity(jsonNode.get("_links").get("self").get("href").asText());
		}
	}

	// TODO: fix this - broken when testing but works at runtime ????
	private void makeWebPageAssertions(JsonNode webPage, int contentItemCount) throws Exception {
		String contentItemsHref = webPage.get("_links").get("contentItems").get("href").asText();
		JsonNode contentItems = getEntity(String.format("/api/repo/webPages/%s/contentItems", webPageId));
		Assertions.assertEquals(contentItemCount, contentItems.get("_embedded").get("webPageContents").size());
	}


	private MvcResult addContentItemToWebPageContent(JsonNode webPageContent) throws Exception {
		Link contentItemLink = entityLinks.linkToItemResource(contentItem, item->item.getId());
		String path = webPageContent.get("_links").get("contentItems").get("href").asText();
		MvcResult results = putUriListToCollectionResource(cleanUrl(path), contentItemLink.getHref());
		return results;
	}

	private MvcResult putUriListToCollectionResource(String path, String href) throws Exception {
		path = cleanUrl(path);
		href = href.replace("http://localhost", "");
		log.info("putting uri list: {} \nto collection: {}", href, path);
		MvcResult mvcResult = mvc.perform(
				put(path)
				.contentType("TEXT/uri-list")
				.content(href)).andExpect(
						status().isNoContent()).andReturn();
		return mvcResult;
	}

	private JsonNode createWebPageContent(String webPageId) throws Exception {
		Map<String, Object> webPageContent = new HashMap<>();
		webPageContent.put("webPage", cleanUrl(entityLinks.linkToItemResource(WebPage.class, webPageId).getHref()));
		webPageContent.put("placeHolderId", "leftSide");
		String bodyString = mapper.writeValueAsString(webPageContent);
		
		JsonNode jsonResult = createEntity("/api/repo/webPageContents", bodyString);
		return jsonResult;
		
	}

	private JsonNode createWebPage() throws Exception {
		WebPageLayout layout = wplRepository.findOneByName(WebPageLayoutFixture.defaultWebPageLayoutName);
		Link layoutLink = entityLinks.linkToItemResource(layout, item->item.getId());

		String exampleName = "EXAMPLE";
		Map<String, Object> bodyMap = new HashMap<>();
		bodyMap.put("id", webPageId);
		bodyMap.put("name", exampleName);
		bodyMap.put("webPageLayout", cleanUrl(layoutLink.getHref()));
		
		String bodyString = mapper.writeValueAsString(bodyMap);
		log.info("bodyString: {}", bodyString);
		
		JsonNode jsonResult = createEntity("/api/repo/webPages", bodyString);
		Assertions.assertEquals(exampleName, jsonResult.get("name").asText());
		return jsonResult;
	}


	private JsonNode createEntity(String path, String body) throws Exception {
		path = cleanUrl(path);
		MvcResult mvcResult = mvc.perform(
				post(path)
				.contentType(MediaType.APPLICATION_JSON)
				.content(body)).andExpect(status().isCreated()).andReturn();
		JsonNode resultJson = mapper.readTree(mvcResult.getResponse().getContentAsString());
		log.info("resultJson: {}", resultJson);
		return resultJson;
	}
	

	private JsonNode getEntity(String path) throws Exception {
		path = cleanUrl(path);
		log.info("getting entity:{}", path);
		MvcResult mvcResult = mvc.perform(
				get(path))
				.andExpect(status().is2xxSuccessful()).andReturn();
		JsonNode resultJson = mapper.readTree(mvcResult.getResponse().getContentAsString());
		log.info("resultJson: {}", resultJson);
		return resultJson;
	}
	
	private MvcResult deleteEntity(String path) throws Exception {
		path = cleanUrl(path);
		MvcResult mvcResult = mvc.perform(
				delete(path)).andExpect(status().is2xxSuccessful()).andReturn();
		return mvcResult;
	}

	private String cleanUrl(String path) {
		return path.replaceAll("\\{.*\\}", "");
	}

	@Configuration
	@EnableAutoConfiguration
	static class TestContext{
		
	}
}
