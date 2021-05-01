package net.savantly.sprout.starter.freemarker;

import java.io.IOException;
import java.io.StringWriter;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;
import net.savantly.sprout.starter.template.TemplateRenderer;

public class FreemarkerRenderer implements TemplateRenderer {
	
	private final Logger log = LoggerFactory.getLogger(FreemarkerRenderer.class);
	private final Configuration configuration;
	
	public FreemarkerRenderer(Configuration configuration) {
		this.configuration = configuration;
	}

	@Override
	public String render(String viewName, Map<String, Object> model) {
		try {
			Template template = configuration.getTemplate(viewName);
			StringWriter writer = new StringWriter();
			template.process(model, writer);
			return writer.toString();
		} catch (IOException | TemplateException e) {
			String errorMsg = "error rendering template: " + viewName;
			log.warn(errorMsg, e);
			return errorMsg;
		}
	}

}
