package net.savantly.sprout.module;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST)
public class PluginException extends RuntimeException {

	public PluginException(String string) {
		super(string);
	}

}
