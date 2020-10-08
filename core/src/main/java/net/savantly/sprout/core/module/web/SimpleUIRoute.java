package net.savantly.sprout.core.module.web;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SimpleUIRoute implements UIRoute {

	private final String path;
	private final String jsModulePath;
}
