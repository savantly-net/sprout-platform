package net.savantly.sprout.core.module;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;

@JsonSerialize(as=SimpleSproutModuleExecutionResponse.class)
public interface SproutModuleExecutionResponse {

	boolean getSucceeded();
	int getCode();
	String getMessage();
}
