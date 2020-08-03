package net.savantly.sprout.core.module;

public class SimpleSproutModuleExecutionResponse implements SproutModuleExecutionResponse {
	private boolean succeeded;
	private int code;
	private String message;

	public SimpleSproutModuleExecutionResponse(boolean succeeded, int code, String message) {
		this.succeeded = succeeded;
		this.code = code;
		this.message = message;
	}

	@Override
	public boolean getSucceeded() {
		return succeeded;
	}

	@Override
	public int getCode() {
		return code;
	}

	@Override
	public String getMessage() {
		return message;
	}

}
