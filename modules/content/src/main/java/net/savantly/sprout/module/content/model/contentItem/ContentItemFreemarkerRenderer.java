package net.savantly.sprout.module.content.model.contentItem;

import java.io.IOException;
import java.io.StringWriter;
import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;

import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;
import freemarker.template.Version;
import net.savantly.sprout.module.content.model.contentField.ContentField;
import net.savantly.sprout.module.content.model.contentField.ContentFieldRepository;
import net.savantly.sprout.module.content.model.contentType.ContentTypeTemplateLoader;

public class ContentItemFreemarkerRenderer implements ContentItemRenderer {

	private Configuration configuration;
	private ContentFieldRepository contentFields;

	public ContentItemFreemarkerRenderer(ContentTypeTemplateLoader loader, ContentFieldRepository contentFields) throws IOException, TemplateException {
		Version incompatibleImprovements = new Version("2.3.26");
		this.configuration = new Configuration(incompatibleImprovements);
		this.configuration.setTemplateLoader(loader);
		this.contentFields = contentFields;
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
	public boolean render(ContentItemImpl item, StringWriter writer) {
		try {
			Template template = configuration.getTemplate(item.getTemplate().getId());
			Map<Object, Object> model = new HashMap<>();

			for (Entry<String, String> elem : item.getFieldValues().entrySet()) {
				ContentField field = contentFields.findById(elem.getKey()).orElseThrow(()->new RuntimeException("contentField not found: " + elem.getKey()));
				model.put(field.getName(), elem.getValue());
			}
			template.process(model, writer);
			return true;
		} catch (Exception ex) {
			writer.write(ex.getMessage());
			return true;
		}
	}
}
