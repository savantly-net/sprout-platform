package net.savantly.sprout.content.contentItem;

import java.io.IOException;
import java.io.StringWriter;
import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;

import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;
import freemarker.template.Version;
import net.savantly.sprout.content.contentType.ContentTypeTemplateLoader;
import net.savantly.sprout.core.content.contentField.ContentField;
import net.savantly.sprout.core.content.contentItem.ContentItem;

public class ContentItemFreemarkerRenderer implements ContentItemRenderer {

	private Configuration configuration;

	public ContentItemFreemarkerRenderer(ContentTypeTemplateLoader loader) throws IOException, TemplateException {
		Version incompatibleImprovements = new Version("2.3.26");
		this.configuration = new Configuration(incompatibleImprovements);
		this.configuration.setTemplateLoader(loader);
	}
	
	@Override
	public int getPriority() {
		return 0;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see net.savantly.sprout.content.contentItem.ContentItemRenderer#render(net.savantly.sprout.core.content.contentItem.ContentItem)
	 */
	@Override
	public boolean render(ContentItem item, StringWriter writer) {
		try {
			Template template = configuration.getTemplate(item.getTemplate().getId());
			Map<Object, Object> model = new HashMap<>();

			for (Entry<ContentField, String> elem : item.getFieldValues().entrySet()) {
				model.put(elem.getKey().getName(), elem.getValue());
			}
			template.process(model, writer);
			return true;
		} catch (Exception ex) {
			writer.write(ex.getMessage());
			return true;
		}
	}
}
