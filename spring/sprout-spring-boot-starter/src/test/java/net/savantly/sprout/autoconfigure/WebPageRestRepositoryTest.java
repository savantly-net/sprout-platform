package net.savantly.sprout.autoconfigure;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.HashMap;
import java.util.Map;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.webmvc.support.RepositoryEntityLinks;
import org.springframework.hateoas.Link;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import net.savantly.sprout.core.content.contentItem.ContentItem;
import net.savantly.sprout.core.content.contentItem.ContentItemRepository;
import net.savantly.sprout.core.content.contentType.ContentTypeFixture;
import net.savantly.sprout.core.content.contentType.ContentTypeRepository;
import net.savantly.sprout.core.content.webPage.WebPage;
import net.savantly.sprout.core.content.webPage.WebPageRepository;
import net.savantly.sprout.core.content.webPageLayout.WebPageLayout;
import net.savantly.sprout.core.content.webPageLayout.WebPageLayoutFixture;
import net.savantly.sprout.core.content.webPageLayout.WebPageLayoutRepository;

@SpringBootTest
@WebAppConfiguration
@RunWith(SpringRunner.class)
public class WebPageRestRepositoryTest {

	private static final Logger log = LoggerFactory.getLogger(WebPageRestRepositoryTest.class);

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
	
	private MockMvc mvc;
	private ContentItem contentItem;

	@Before
	public void setup() {
		mvc = MockMvcBuilders
				.webAppContextSetup(ctx)
				.build();
		ContentItem contentItem = new ContentItem();
		contentItem.setContentType(ctRepository.findByName(ContentTypeFixture.defaultContentTypeName));
		this.contentItem = ciRepository.save(contentItem);
	}
	
	@Test
	public void testRestApi() throws Exception {
		// Create webPage
		JsonNode webPage = createWebPage();
		String webPageId = webPage.get("id").asText();

		// Add webPageContent item
		JsonNode webPageContent = createWebPageContent(webPageId);

		// Add ContentItem to webPageContent
		MvcResult contentItemResult  = addContentItemToWebPageContent(webPageContent);	
		
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

	private void makeWebPageAssertions(JsonNode webPage, int contentItemCount) throws Exception {
		String contentItemsHref = webPage.get("_links").get("contentItems").get("href").asText();
		JsonNode contentItems = getEntity(contentItemsHref);
		Assert.assertEquals("the number of webPageContent items is wrong", contentItemCount, contentItems.get("_embedded").get("webPageContents").size());
	}


	private MvcResult addContentItemToWebPageContent(JsonNode webPageContent) throws Exception {
		Link contentItemLink = entityLinks.linkToSingleResource(contentItem);
		String path = webPageContent.get("_links").get("contentItems").get("href").asText();
		MvcResult results = putUriListToCollectionResource(path, contentItemLink.getHref());
		return results;
	}

	private MvcResult putUriListToCollectionResource(String path, String href) throws Exception {
		MvcResult mvcResult = mvc.perform(
				put(path)
				.contentType("text/uri-list")
				.content(href)).andExpect(status().is2xxSuccessful()).andReturn();
		return mvcResult;
	}

	private JsonNode createWebPageContent(String webPageId) throws Exception {
		Map<String, Object> webPageContent = new HashMap<>();
		webPageContent.put("webPage", entityLinks.linkToSingleResource(WebPage.class, webPageId).getHref());
		webPageContent.put("placeHolderId", "leftSide");
		String bodyString = mapper.writeValueAsString(webPageContent);
		
		JsonNode jsonResult = createEntity("/api/webPageContents", bodyString);
		return jsonResult;
		
	}

	private JsonNode createWebPage() throws Exception {
		WebPageLayout layout = wplRepository.findOneByName(WebPageLayoutFixture.defaultWebPageLayoutName);
		Link layoutLink = entityLinks.linkToSingleResource(layout);

		String exampleName = "EXAMPLE";
		Map<String, Object> bodyMap = new HashMap<>();
		bodyMap.put("name", exampleName);
		bodyMap.put("webPageLayout", layoutLink.getHref());
		
		String bodyString = mapper.writeValueAsString(bodyMap);
		log.info("bodyString: {}", bodyString);
		
		JsonNode jsonResult = createEntity("/api/webPages", bodyString);
		Assert.assertEquals("name should be the same", exampleName, jsonResult.get("name").asText());
		return jsonResult;
	}


	private JsonNode createEntity(String path, String body) throws Exception {
		MvcResult mvcResult = mvc.perform(
				post(path)
				.contentType(MediaType.APPLICATION_JSON_UTF8)
				.content(body)).andExpect(status().isCreated()).andReturn();
		JsonNode resultJson = mapper.readTree(mvcResult.getResponse().getContentAsString());
		log.info("resultJson: {}", resultJson);
		return resultJson;
	}
	

	private JsonNode getEntity(String path) throws Exception {
		MvcResult mvcResult = mvc.perform(
				get(path)).andExpect(status().is2xxSuccessful()).andReturn();
		JsonNode resultJson = mapper.readTree(mvcResult.getResponse().getContentAsString());
		log.info("resultJson: {}", resultJson);
		return resultJson;
	}
	
	private MvcResult deleteEntity(String path) throws Exception {
		MvcResult mvcResult = mvc.perform(
				delete(path)).andExpect(status().is2xxSuccessful()).andReturn();
		return mvcResult;
	}

	@Configuration
	@EnableAutoConfiguration
	static class TestContext{
		
	}
}
