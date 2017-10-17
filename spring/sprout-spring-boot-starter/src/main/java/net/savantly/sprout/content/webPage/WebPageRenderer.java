package net.savantly.sprout.content.webPage;

import java.io.IOException;
import java.io.StringWriter;
import java.util.HashMap;
import java.util.Map;

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

	public String render(WebPage item) throws TemplateNotFoundException, 
		MalformedTemplateNameException, ParseException, IOException, TemplateException {
		Template template = configuration.getTemplate(item.getWebPageLayout().getId());
		StringWriter writer = new StringWriter();

		Map<Object, Object> model = new HashMap<>();
		
		for (String key : item.getContentItems().keySet()) {
			String renderedContentItem = contentItemRenderer.render(item.getContentItems().get(key));
			model.put(key, renderedContentItem);
		}
		
		template.process(model, writer);
		return writer.toString();
	}
}
