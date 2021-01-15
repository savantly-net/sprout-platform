package net.savantly.sprout.domain.branding.style;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

@Getter
@Setter
@Accessors(chain = true)
public class ConditionalStyle {

	private StyleMatchType matchType = StyleMatchType.LOCATION;
	private String matchExpression;
	private String value;
}
