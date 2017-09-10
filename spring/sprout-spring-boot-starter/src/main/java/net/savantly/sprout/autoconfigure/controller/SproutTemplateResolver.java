package net.savantly.sprout.autoconfigure.controller;

import org.thymeleaf.templateresolver.TemplateResolver;

public class SproutTemplateResolver extends TemplateResolver {
	public SproutTemplateResolver() {
		super();
		super.setResourceResolver(new SproutControllerResourceResolver());
	}

}
