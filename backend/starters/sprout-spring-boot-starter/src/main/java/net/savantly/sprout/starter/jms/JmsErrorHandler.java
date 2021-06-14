package net.savantly.sprout.starter.jms;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.ErrorHandler;

public class JmsErrorHandler implements ErrorHandler {
	
	private static final Logger log = LoggerFactory.getLogger(JmsErrorHandler.class);

	@Override
	public void handleError(Throwable t) {
		log.error("jms failed: {}", t.getMessage());
	}

}
