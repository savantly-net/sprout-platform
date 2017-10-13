package net.savantly.sprout.core.content.contentField;

import java.io.IOException;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.KeyDeserializer;

public class ContentFieldKeyDeserializer extends KeyDeserializer {

	@Override
	public ContentField deserializeKey(String key, DeserializationContext ctx) throws IOException, JsonProcessingException {
		// TODO Auto-generated method stub
		return null;
	}

	
}
