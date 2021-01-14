package net.savantly.sprout.converter.spring;

import java.time.ZonedDateTime;
import java.util.Date;
import java.util.Objects;

import org.springframework.core.convert.converter.Converter;

public class ZonedDateTimeToDateConverter implements Converter<ZonedDateTime, Date> {

	@Override
	public Date convert(ZonedDateTime source) {
		if (Objects.nonNull(source)) {
			return Date.from(source.toInstant());
		} else {
			return null;
		}
	}

}
