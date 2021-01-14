package net.savantly.sprout.core.converter;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.Date;
import java.util.Optional;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter(autoApply = true)
public class OptionalZonedDateTimeToDateConverter implements AttributeConverter<Optional<ZonedDateTime>, Date> {

	@Override
	public Date convertToDatabaseColumn(Optional<ZonedDateTime> attribute) {
		return Date.from(attribute.orElse(ZonedDateTime.now()).toInstant());
	}

	@Override
	public Optional<ZonedDateTime> convertToEntityAttribute(Date dbData) {
		return dbData == null ? Optional.empty() : Optional.of(ZonedDateTime.ofInstant(dbData.toInstant(), ZoneId.systemDefault()));
	}

}
