package net.savantly.sprout.module.forms.exception;

public class FormConversionException extends RuntimeException {

	public FormConversionException() {
		super();
	}
	
	public FormConversionException(Exception e) {
		super(e);
	}

	public FormConversionException(String msg) {
		super(msg);
	}
}
