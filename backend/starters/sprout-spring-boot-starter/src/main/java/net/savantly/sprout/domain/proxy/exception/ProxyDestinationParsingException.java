package net.savantly.sprout.domain.proxy.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST)
public class ProxyDestinationParsingException extends RuntimeException {

	public ProxyDestinationParsingException(String message) {
		super(message);
	}

}
