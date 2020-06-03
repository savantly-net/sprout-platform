package net.savantly.sprout.core.module;

public interface SproutModule {

	String getKey();
	String getName();
	String getVersion();
	String getDescription();
	
	default SproutModuleExecutionResponse install() {
		return new SimpleSproutModuleExecutionResponse(true, 0, "nothing to install");
	}
	default SproutModuleExecutionResponse uninstall() {
		return new SimpleSproutModuleExecutionResponse(true, 0, "nothing to uninstall");
	}
}
