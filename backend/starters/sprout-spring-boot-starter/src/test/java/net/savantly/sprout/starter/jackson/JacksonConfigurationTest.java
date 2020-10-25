package net.savantly.sprout.starter.jackson;

import java.time.ZonedDateTime;
import java.util.HashMap;
import java.util.Map;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import net.savantly.sprout.autoconfigure.properties.SproutConfigurationProperties;

public class JacksonConfigurationTest {
	private final Logger log = LoggerFactory.getLogger(JacksonConfigurationTest.class);

	@Test
	public void testDate() throws JsonProcessingException {
		DefaultJacksonConfiguration config = new DefaultJacksonConfiguration(new SproutConfigurationProperties());
		ObjectMapper mapper = config.objectMapper();
		
		Map<String, ZonedDateTime> obj = new HashMap<>();
		String key = "date";
		ZonedDateTime value = ZonedDateTime.now();
		obj.put(key, value);
		
		String json = mapper.writeValueAsString(obj);
		log.debug("value as string: {}", json);
		
		JsonNode jsonNode = mapper.readTree(json);
		Assertions.assertTrue(jsonNode.has("date"));
		Assertions.assertTrue(jsonNode.at("/date").isTextual());
		Assertions.assertTrue(jsonNode.at("/date").asText().contains("T"));
		
		Map<String, String> deserialized = mapper.readValue(json, Map.class);
		String dateString = deserialized.get(key);
		ZonedDateTime actual = ZonedDateTime.parse(dateString);
		
		Assertions.assertEquals(value.toEpochSecond(), actual.toEpochSecond());
	}
}
