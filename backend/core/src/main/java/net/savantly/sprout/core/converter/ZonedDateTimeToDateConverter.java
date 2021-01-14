package net.savantly.sprout.core.converter;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.Date;
import java.util.Objects;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter(autoApply = true)
public class ZonedDateTimeToDateConverter implements AttributeConverter<ZonedDateTime, Date> {

	@Override
	public Date convertToDatabaseColumn(ZonedDateTime attribute) {
		if (Objects.nonNull(attribute)) {
			return Date.from(attribute.toInstant());
		} else {
			return null;
		}
	}

	@Override
	public ZonedDateTime convertToEntityAttribute(Date dbData) {
		return dbData == null ? null : ZonedDateTime.ofInstant(dbData.toInstant(), ZoneId.systemDefault());
	}

}