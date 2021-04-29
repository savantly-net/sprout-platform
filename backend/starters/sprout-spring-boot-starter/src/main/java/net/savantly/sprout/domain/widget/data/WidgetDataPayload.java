package net.savantly.sprout.domain.widget.data;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

@Getter
@Setter
@Accessors(chain = true)
class WidgetDataPayload {

	private String id;
	private String name;
	private WidgetDataType dataType;
	private Object data;
}
