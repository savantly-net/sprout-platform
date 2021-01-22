package net.savantly.sprout.domain.proxy;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.regex.Pattern;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import lombok.RequiredArgsConstructor;
import net.savantly.sprout.autoconfigure.properties.SproutConfigurationProperties;
import net.savantly.sprout.domain.proxy.exception.IllegalProxyDestination;

@RestController
@RequestMapping(ProxyApi.apiPath)
@RequiredArgsConstructor
public class ProxyApi implements InitializingBean {

	static final String apiPath = "/api/proxy";
	private static final Logger log = LoggerFactory.getLogger(ProxyApi.class);
	private final SproutConfigurationProperties props;
	private List<Pattern> allowedUris;
	private RestTemplate rest = new RestTemplate();
	private List<String> excludedResponseHeaders = Arrays.asList("content-disposition");

	@GetMapping({ "", "/" })
	public String imok() {
		return "imok";
	}

	@PostMapping(consumes = {MediaType.APPLICATION_JSON_VALUE, "application/json;charset=UTF-8"})
	public ResponseEntity<byte[]> post(@RequestBody ProxyRequestDto requestDto) 
			throws Exception {
		validateDestination(requestDto.getUrl());
		HttpEntity<Object> requestEntity = new HttpEntity<Object>(requestDto.getBody(), convertRequestHeaders(requestDto.getHeaders()));

		return doRequest(requestDto.getUrl(), requestDto.getMethod(), requestEntity);
	}

	private MultiValueMap<String, String> convertRequestHeaders(Map<String, String> headers) {
		HttpHeaders requestHeaders = new HttpHeaders();
		
		headers.forEach((k, v) -> {
			if (!excludedRequestHeader(k)) {
				requestHeaders.add(k, v);
			}
			
		});
		return requestHeaders;
	}

	private void validateDestination(String requestedUri) {
		AtomicBoolean match = new AtomicBoolean(false);
		allowedUris.stream().forEach(a -> {
			if (a.matcher(requestedUri).matches()) {
				match.set(true);
			}
		});
		if (!match.get()) {
			throw new IllegalProxyDestination(requestedUri);
		}
	}

	private boolean excludedRequestHeader(String headerName) {
		// TODO determine which headers should be excluded
		return false;
	}
	
	private boolean excludedResponseHeader(String headerName) {
		AtomicBoolean match = new AtomicBoolean(false);
		excludedResponseHeaders.forEach(v -> {
			if (v.toUpperCase().contentEquals(headerName.toUpperCase())) {
				match.set(true);
			}
		});
		
		return match.get();
	}

	private ResponseEntity<byte[]> doRequest(String url, HttpMethod method, HttpEntity<Object> requestEntity) {
		ResponseEntity<byte[]> response = rest.exchange(url, method, requestEntity, byte[].class);
		return ResponseEntity.status(response.getStatusCode()).headers(getResponseHeaders(response.getHeaders())).body(response.getBody());
	}

	private HttpHeaders getResponseHeaders(HttpHeaders headers) {
		HttpHeaders result = new HttpHeaders();
		headers.forEach((k, v) -> {
			if (!excludedResponseHeader(k)) {
				result.addAll(k, v);
			}
		});
		return result;
	}

	@Override
	public void afterPropertiesSet() throws Exception {
		this.allowedUris = new ArrayList<Pattern>();
		props.getProxy().getAllowedUris().forEach(a -> {
			this.allowedUris.add(Pattern.compile(a));
		});
	}
}
