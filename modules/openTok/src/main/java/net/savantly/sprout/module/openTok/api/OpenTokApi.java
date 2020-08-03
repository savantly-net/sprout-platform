package net.savantly.sprout.module.openTok.api;

import javax.annotation.PostConstruct;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.opentok.OpenTok;
import com.opentok.Role;
import com.opentok.TokenOptions;
import com.opentok.exception.OpenTokException;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/openTok")
@RequiredArgsConstructor
public class OpenTokApi {

	private final int apiKey;
	private final String apiSecret;
	private final String sessionId;
	private OpenTok openTok;
	
	@PostConstruct
	public void postConstruct() {
		this.openTok = new OpenTok(apiKey, apiSecret);
	}
	
	@GetMapping("/token/{name}")
	public String getTokenForSession(@PathVariable String name) throws OpenTokException {
		TokenOptions tokenOptions = new TokenOptions.Builder().data(String.format("name=%s", name)).role(Role.PUBLISHER).build();
		return this.openTok.generateToken(sessionId, tokenOptions);
	}
	
}
