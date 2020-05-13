package net.savantly.sprout.core.content.contentItem;

import java.io.IOException;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.KeyDeserializer;

public class ContentItemKeyDeserializer extends KeyDeserializer {
	
	private ContentItemRepository repository;

	public ContentItemKeyDeserializer(ContentItemRepository repository) {
		this.repository = repository;
	}

	@Override
	public Object deserializeKey(String key, DeserializationContext ctxt) throws IOException, JsonProcessingException {
		String[] parts = key.split("/");
		return repository.findById(parts[parts.length-1]).orElseThrow(RuntimeException::new);
	}
}
