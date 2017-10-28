package net.savantly.sprout.core.content.fieldType;

public enum FieldType {

	text(".*");
	
	String validator;
	
	FieldType(String validator) {
		this.validator = validator;
	}
	
	boolean validate(String value) {
		return true;
	}
	
}
