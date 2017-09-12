package net.savantly.sprout.autoconfigure.controller;

import org.thymeleaf.templateresolver.TemplateResolver;

public class SproutThymeleafTemplateResolver extends TemplateResolver {
	public SproutThymeleafTemplateResolver() {
		super();
		super.setResourceResolver(new SproutThymeleafResourceResolver());
	}

}
