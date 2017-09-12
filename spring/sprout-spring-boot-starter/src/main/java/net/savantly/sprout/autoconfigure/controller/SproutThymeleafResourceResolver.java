package net.savantly.sprout.autoconfigure.controller;

import java.io.InputStream;

import org.springframework.core.io.ClassPathResource;
import org.thymeleaf.TemplateProcessingParameters;
import org.thymeleaf.resourceresolver.IResourceResolver;
import org.thymeleaf.util.Validate;

public class SproutThymeleafResourceResolver implements IResourceResolver {
	public static final String NAME = "CLASSLOADER";
    private final ClassLoader cl = SproutThymeleafResourceResolver.class.getClassLoader();

	public SproutThymeleafResourceResolver() {
		super();
	}

	public String getName() {
		return NAME;
	}

	public InputStream getResourceAsStream(final TemplateProcessingParameters templateProcessingParameters,
			final String resourceName) {
		Validate.notNull(resourceName, "Resource name cannot be null");
        String url = new ClassPathResource(resourceName).getPath();
        InputStream resourceStream = cl.getResourceAsStream(url);
        return resourceStream;
	}

}