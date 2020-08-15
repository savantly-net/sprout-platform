package net.savantly.sprout.module.content.model.contentField;

import javax.transaction.Transactional;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.web.WebAppConfiguration;

import net.savantly.sprout.module.content.SproutContentModule;
import net.savantly.sprout.module.content.model.fieldType.FieldType;
import net.savantly.sprout.modules.test.ModuleTestApplication;

@SpringBootTest
@WebAppConfiguration
@Transactional
public class ContentFieldTest {
	
	@Autowired
	ContentFieldRepository repository;
	
	@Test
	public void testContentField() {
		ContentFieldImpl item = new ContentFieldImpl();
		item.setName("test");
		item.setFieldType(FieldType.text);
		
		ContentField saved = repository.save(item);
		Assertions.assertEquals(item.getName(), saved.getName(), "name should match");
		Assertions.assertEquals(item.getFieldType(), saved.getFieldType(), "fieldType should match");
	}
	
	@Configuration
	@Import({SproutContentModule.class, ModuleTestApplication.class})
	static class TestContext{
		
	}

}
