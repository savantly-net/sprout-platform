package net.savantly.sprout.content.contentItem;

import java.io.IOException;
import java.io.StringWriter;
import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;

import freemarker.core.ParseException;
import freemarker.template.Configuration;
import freemarker.template.MalformedTemplateNameException;
import freemarker.template.Template;
import freemarker.template.TemplateException;
import freemarker.template.TemplateNotFoundException;
import freemarker.template.Version;
import net.savantly.sprout.content.contentType.ContentTypeTemplateLoader;
import net.savantly.sprout.core.content.contentField.ContentField;
import net.savantly.sprout.core.content.contentItem.ContentItem;

public class ContentItemRenderer {

	private Configuration configuration;

	public ContentItemRenderer(ContentTypeTemplateLoader loader) throws IOException, TemplateException {
		Version incompatibleImprovements = new Version("2.3.26");
		this.configuration = new Configuration(incompatibleImprovements);
		this.configuration.setTemplateLoader(loader);
	}

	public String render(ContentItem item) throws TemplateNotFoundException, 
		MalformedTemplateNameException, ParseException, IOException, TemplateException {
		Template template = configuration.getTemplate(item.getTemplate().getId());
		StringWriter writer = new StringWriter();
		Map<Object, Object> model = new HashMap<>();
		
		for (Entry<ContentField, String> elem : item.getFieldValues().entrySet()) {
			model.put(elem.getKey().getName(), elem.getValue());
		}
		
		template.process(model, writer);
		return writer.toString();
	}
}
