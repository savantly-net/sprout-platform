package net.savantly.sprout.controllers.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST)
public class UnknownSproutModule extends RuntimeException {
	
	public UnknownSproutModule(String msg) {
		super(msg);
	}

}
