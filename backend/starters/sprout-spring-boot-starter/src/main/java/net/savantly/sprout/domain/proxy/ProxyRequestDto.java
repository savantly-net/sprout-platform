package net.savantly.sprout.domain.proxy;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpMethod;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

@Accessors(chain = true)
@Getter @Setter
public class ProxyRequestDto {

	private String url;
	private HttpMethod method;
	private Object body;
	private Map<String, String> headers = new HashMap<String, String>();
}
