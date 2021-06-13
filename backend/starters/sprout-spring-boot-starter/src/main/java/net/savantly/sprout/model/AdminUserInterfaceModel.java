package net.savantly.sprout.model;

import java.util.List;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class AdminUserInterfaceModel {

	private List<String> scripts;
	
}
