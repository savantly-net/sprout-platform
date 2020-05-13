package net.savantly.sprout.core.content.contentField;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import net.savantly.sprout.core.DataIntegrationTest;
import net.savantly.sprout.core.content.fieldType.FieldType;

@DataIntegrationTest
public class ContentFieldTest {
	
	@Autowired
	ContentFieldRepository repository;
	
	@Test
	public void testContentField() {
		ContentField item = new ContentField();
		item.setName("test");
		item.setFieldType(FieldType.text);
		
		ContentField saved = repository.save(item);
		Assertions.assertEquals(item.getName(), saved.getName(), "name should match");
		Assertions.assertEquals(item.getFieldType(), saved.getFieldType(), "fieldType should match");
	}
}
