package net.savantly.sprout.domain.proxy.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST)
public class IllegalProxyDestination extends RuntimeException {

	public IllegalProxyDestination(String path) {
		super(path);
	}

	public IllegalProxyDestination(Exception e) {
		super(e);
	}

}
