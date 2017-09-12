package net.savantly.sprout.core.resource;

import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;

public class SproutResourcePatternResolver<T> {
	
	private static final Logger log = LoggerFactory.getLogger(SproutResourcePatternResolver.class);
	
	private final PathMatchingResourcePatternResolver resolver;
	
	private SproutResourcePatternResolver(Class<T> clazz) {
		resolver = new PathMatchingResourcePatternResolver(clazz.getClassLoader());
	}

	public static <T> SproutResourcePatternResolver<T> of(Class<T> clazz){
		return new SproutResourcePatternResolver<T>(clazz);
	}
	
	public Resource[] getResourcePaths(String pattern) {
		log.info(String.format("Finding embedded resource paths for: %s", pattern));
		Resource[] moduleResources = new Resource[0];
		try {
			moduleResources = resolver.getResources(pattern);
		} catch (IOException e) {
			log.warn(String.format("Error processing resources for pattern: %s", pattern), e);
		}
		return moduleResources;
	}
	


}
