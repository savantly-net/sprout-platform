package net.savantly.sprout.domain.home;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class SimpleHomePage implements HomePageData {

	private HomePageDataType dataType;
	private Object data;
	
}
