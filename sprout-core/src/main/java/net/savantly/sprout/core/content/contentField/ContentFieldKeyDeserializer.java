package net.savantly.sprout.core.content.contentField;

import java.io.IOException;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.KeyDeserializer;

public class ContentFieldKeyDeserializer extends KeyDeserializer {
	
	private ContentFieldRepository repository;

	public ContentFieldKeyDeserializer(ContentFieldRepository repository) {
		this.repository = repository;
	}

	@Override
	public ContentField deserializeKey(String key, DeserializationContext ctx) throws IOException, JsonProcessingException {
		String[] parts = key.split("/");
		return repository.findById(parts[parts.length-1]).get();
	}

	
}
