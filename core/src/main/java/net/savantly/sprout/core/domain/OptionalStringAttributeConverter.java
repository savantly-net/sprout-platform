package net.savantly.sprout.core.domain;

import java.util.Optional;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter(autoApply = true)
public class OptionalStringAttributeConverter implements AttributeConverter<Optional<String>, String> {

	@Override
	public String convertToDatabaseColumn(Optional<String> attribute) {
		return attribute.orElse(null);
	}

	@Override
	public Optional<String> convertToEntityAttribute(String dbData) {
		return Optional.of(dbData);
	}

}
