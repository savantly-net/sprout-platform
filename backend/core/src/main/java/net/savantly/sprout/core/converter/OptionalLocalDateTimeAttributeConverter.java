package net.savantly.sprout.core.converter;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Optional;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter(autoApply = true)
public class OptionalLocalDateTimeAttributeConverter implements AttributeConverter<Optional<LocalDateTime>, Timestamp> {
	
    @Override
    public Timestamp convertToDatabaseColumn(Optional<LocalDateTime> locDateTime) {
    	return ((locDateTime == null || !locDateTime.isPresent()) ? null : Timestamp.valueOf(locDateTime.get()));
    }

    @Override
    public Optional<LocalDateTime> convertToEntityAttribute(Timestamp sqlTimestamp) {
    	return (sqlTimestamp == null ? null : Optional.of(sqlTimestamp.toLocalDateTime()));
    }
}