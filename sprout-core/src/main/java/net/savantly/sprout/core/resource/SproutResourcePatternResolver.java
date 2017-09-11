package net.savantly.sprout.core.resource;

import java.io.IOException;
import java.net.URL;
import java.util.List;

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
	
	public List<String> getResourcePaths(String pattern, List<String> resourceArray) {
		return getResourcePaths(pattern, resourceArray, false, null);
	}
	
	public List<String> getResourcePaths(String pattern, List<String> resourceArray, boolean trimPrefix, String prefix) {
		return getResourcePaths(pattern, resourceArray, trimPrefix, prefix, false, null);
	}
	
	public List<String> getResourcePaths(String pattern, List<String> resourceArray, boolean trimPrefix, String prefix,
			boolean appendPostFix, String postfix) {
		log.info(String.format("Finding embedded resource paths for: %s", pattern));
		try {
			Resource[] moduleResources = resolver.getResources(pattern);
			for (Resource resource : moduleResources) {
				log.debug(String.format("Processing resource: %s", resource));

				URL resourceURL = resource.getURL();
				log.debug(String.format("Found resource URL: %s", resourceURL));
				String protocol = resourceURL.getProtocol();
				if ("http".equals(protocol) || "https".equals(protocol) || !(trimPrefix)) {
					resourceArray.add(resourceURL.toString());
				} else {
					String padded = String.format("%s%s", truncateBeginningOfPath(resourceURL.getPath(), prefix), postfix);
					log.info("Adding trimmed and padded resource: {}", padded);
					resourceArray.add(padded);
				}
			}
		} catch (IOException e) {
			log.warn(String.format("Error processing resources for pattern: %s", pattern), e);
		}
		return resourceArray;
	}
	
	private String truncateBeginningOfPath(String fullPath, String stringToMatch) {
		if (fullPath == null || fullPath.length() == 0) {
			throw new RuntimeException("fullPath is null or empty.");
		}
		if (stringToMatch == null || stringToMatch.length() == 0) {
			throw new RuntimeException("stringToMatch is null or empty.");
		}
		int matchIndex = fullPath.indexOf(stringToMatch);
		int splitIndex = matchIndex + stringToMatch.length();
		if (matchIndex == -1) {
			return fullPath;
		} else {
			return fullPath.substring(splitIndex);
		}
	}


}
