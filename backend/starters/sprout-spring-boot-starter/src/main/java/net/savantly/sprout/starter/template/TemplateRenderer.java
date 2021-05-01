package net.savantly.sprout.starter.template;

import java.util.Map;

/**
 * Renders a template using a supplied model
 * @author jeremy branham
 *
 */
public interface TemplateRenderer {

	String render(String templateName, Map<String, Object> model);
}
