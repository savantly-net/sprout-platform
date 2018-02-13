package net.savantly.sprout.core.content.fieldType;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import com.fasterxml.jackson.databind.node.ObjectNode;

public enum FieldType {

	text(),
	markup(),
	markdown(),
	email("[\\w-]+@([\\w-]+\\.)+[\\w-]+"),
	json();
	
	private String validator;
	
	FieldType() {
		this.setValidator(".*");
	}
	FieldType(String validator) {
		this.setValidator(validator);
	}
	
	boolean validate(String value) {
		return true;
	}
	public String getValidator() {
		return validator;
	}
	private void setValidator(String validator) {
		this.validator = validator;
	}
	
	public JsonNode toJsonNode() {
		ObjectNode rootNode = JsonNodeFactory.instance.objectNode();
		rootNode.put("name", this.name());
		rootNode.put("validator", this.validator);
		return rootNode;
	}
}
