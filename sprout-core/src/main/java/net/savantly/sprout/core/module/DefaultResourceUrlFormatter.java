package net.savantly.sprout.core.module;

import java.io.IOException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.Resource;

public class DefaultResourceUrlFormatter implements ResourceUrlFormatter {
	private static final Logger log = LoggerFactory.getLogger(DefaultResourceUrlFormatter.class);
	
	private final boolean trimPrefix;
	private final String prefix;
	private final String postfix;

	public DefaultResourceUrlFormatter(boolean trimPrefix, String prefix, String postfix) {
		this.trimPrefix = trimPrefix;
		this.prefix = prefix;
		this.postfix = postfix;
	}

	public List<String> format(Resource[] resources){
		List<String> resourceArray = new ArrayList<String>();
		for (Resource resource : resources) {
			log.debug(String.format("Processing resource: %s", resource));
			try {
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
			} catch (IOException e) {
				log.warn(String.format("Error processing resource: %s", resource), e);
			}
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
