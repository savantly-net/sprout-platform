package net.savantly.sprout.module.openTok;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;

import lombok.Data;
import net.savantly.sprout.core.module.SproutModuleConfiguration;
import net.savantly.sprout.module.openTok.api.OpenTokApi;

@Data
@SproutModuleConfiguration
@ConfigurationProperties("opentok")
public class OpenTokModuleConfiguration {
	
	private final static Logger log = LoggerFactory.getLogger(OpenTokModuleConfiguration.class);
	
	private int apiKey = 0;
	private String apiSecret = "";
	private String sessionId = "";
	
	/*
	 * Warn about invalid config but don't halt server startup
	 * If the config is invalid, it won't throw an exception until the API is used
	 */
	@Bean
	public OpenTokApi openTokApi() {
		if(apiKey == 0) {
			log.error("opentok.apiKey is not configured");
		}
		if("".contentEquals(apiSecret)) {
			log.error("opentok.apiSecret is not configured");
		}
		if("".contentEquals(sessionId)) {
			log.error("opentok.sessionId is not configured");
		}
		return new OpenTokApi(apiKey, apiSecret, sessionId);
	}

}
