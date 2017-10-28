package net.savantly.sprout.content.webPage;

import java.io.IOException;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.transaction.Transactional;

import org.springframework.util.Assert;

import freemarker.core.ParseException;
import freemarker.template.Configuration;
import freemarker.template.MalformedTemplateNameException;
import freemarker.template.Template;
import freemarker.template.TemplateException;
import freemarker.template.TemplateNotFoundException;
import freemarker.template.Version;
import net.savantly.sprout.content.contentItem.ContentItemRenderer;
import net.savantly.sprout.content.webPageLayout.WebPageLayoutTemplateLoader;
import net.savantly.sprout.core.content.webPage.WebPage;

public class WebPageRenderer {

	private Configuration configuration;
	private ContentItemRenderer contentItemRenderer;

	public WebPageRenderer(WebPageLayoutTemplateLoader loader, ContentItemRenderer contentItemRenderer) throws IOException, TemplateException {
		Version incompatibleImprovements = new Version("2.3.26");
		this.configuration = new Configuration(incompatibleImprovements);
		this.configuration.setTemplateLoader(loader);
		this.contentItemRenderer = contentItemRenderer;
	}

	@Transactional
	public String render(WebPage item) throws TemplateNotFoundException, 
		MalformedTemplateNameException, ParseException, IOException, TemplateException {
		
		Assert.notNull(item, "The WebPage item should not be null");
		Assert.notNull(item.getWebPageLayout(), "The WebPageLayout should not be null");
		
		Template template = configuration.getTemplate(item.getWebPageLayout().getId());
		StringWriter writer = new StringWriter();

		Map<String, List<String>> temp = new HashMap<>();
		
		item.getContentItems().stream().forEach((c) -> {
			if (!temp.containsKey(c.getPlaceHolderId())) {
				temp.put(c.getPlaceHolderId(), new ArrayList<String>());
			}
			c.getContentItems().stream().forEach((i) -> {
				String renderedContentItem = String.format("Error while rendering item: %s id: %s", i.getName(), i.getId());
				try {
					renderedContentItem = contentItemRenderer.render(i);
				} catch (IOException | TemplateException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				temp.get(c.getPlaceHolderId()).add(renderedContentItem);
			});
		});
		

		Map<Object, Object> model = new HashMap<>();
		for (String key : temp.keySet()) {
			model.put(key, temp.get(key).stream().reduce("", (s1, s2) -> {return s1.concat(s2);}));
		}
		
		template.process(model, writer);
		return writer.toString();
	}
}
