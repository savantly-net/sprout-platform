package net.savantly.sprout.core.converter;

import java.io.IOException;
import java.util.Map;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@Converter
public class HashMapJpaConverter implements AttributeConverter<Map<String, Object>, String> {
	private static final Logger log = LoggerFactory.getLogger(HashMapJpaConverter.class);
	
	ObjectMapper objectMapper = new ObjectMapper();
	 
    @Override
    public String convertToDatabaseColumn(Map<String, Object> map) {
 
        String json = null;
        try {
            json = objectMapper.writeValueAsString(map);
        } catch (final JsonProcessingException e) {
            log.error("JSON writing error", e);
        }
 
        return json;
    }
 
    @Override
    public Map<String, Object> convertToEntityAttribute(String json) {
 
        Map<String, Object> map = null;
        try {
            map = objectMapper.readValue(json, Map.class);
        } catch (final IOException e) {
            log.error("JSON reading error", e);
        }
 
        return map;
    }
 
}