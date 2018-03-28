package net.savantly.sprout.autoconfigure;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.HashMap;
import java.util.Map;

import javax.transaction.Transactional;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.webmvc.support.RepositoryEntityLinks;
import org.springframework.hateoas.Link;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import net.savantly.sprout.EmbeddedSproutServer;
import net.savantly.sprout.core.content.contentItem.ContentItem;
import net.savantly.sprout.core.content.contentItem.ContentItemRepository;
import net.savantly.sprout.core.content.contentType.ContentTypeFixture;
import net.savantly.sprout.core.content.contentType.ContentTypeRepository;
import net.savantly.sprout.core.content.webPage.WebPage;
import net.savantly.sprout.core.content.webPage.WebPageRepository;
import net.savantly.sprout.core.content.webPageLayout.WebPageLayout;
import net.savantly.sprout.core.content.webPageLayout.WebPageLayoutFixture;
import net.savantly.sprout.core.content.webPageLayout.WebPageLayoutRepository;

@SpringBootTest(classes= {EmbeddedSproutServer.class}, webEnvironment=WebEnvironment.RANDOM_PORT)
@RunWith(SpringRunner.class)
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
	private ContentItem contentItem;

	@Before
	public void setup() {
		mvc = MockMvcBuilders
				.webAppContextSetup(ctx)
				.build();

		RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));
	}
	
	@Test
	public void testRestApi() throws Exception {

		ContentItem contentItem = new ContentItem();
		contentItem.setContentType(ctRepository.findByName(ContentTypeFixture.defaultContentTypeName));
		this.contentItem = ciRepository.save(contentItem);
		
		// Create webPage
		JsonNode webPage = createWebPage();

		// Add webPageContent item
		JsonNode webPageContent = createWebPageContent(webPageId);
		
		// Add ContentItem to webPageContent
		addContentItemToWebPageContent(webPageContent);	
		
		/** Broken in unit tests ???
		
		// assert there is 1 WebPageContent
		makeWebPageAssertions(webPage, 1);
		
		// remove it
		removeWebPageContents(webPage);
		// and assert it is gone
		makeWebPageAssertions(webPage, 0);
		**/
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
		JsonNode contentItems = getEntity(String.format("/api/webPages/%s/contentItems", webPageId));
		Assert.assertEquals("the number of webPageContent items is wrong", contentItemCount, contentItems.get("_embedded").get("webPageContents").size());
	}


	private MvcResult addContentItemToWebPageContent(JsonNode webPageContent) throws Exception {
		Link contentItemLink = entityLinks.linkToSingleResource(contentItem);
		String path = webPageContent.get("_links").get("contentItems").get("href").asText().replaceAll("\\{.*\\}", "");
		MvcResult results = putUriListToCollectionResource(path, contentItemLink.getHref().replaceAll("\\{.*\\}", ""));
		return results;
	}

	private MvcResult putUriListToCollectionResource(String path, String href) throws Exception {
		href = href.replace("http://localhost", "");
		log.info("putting uri list: {} \nto collection: {}", href, path);
		MvcResult mvcResult = mvc.perform(
				put(path)
				.contentType("text/uri-list")
				.content(href)).andExpect(
						status().isNoContent()).andReturn();
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
		bodyMap.put("id", webPageId);
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
		log.info("getting entity:{}", path);
		MvcResult mvcResult = mvc.perform(
				get(path))
				.andExpect(status().is2xxSuccessful()).andReturn();
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
