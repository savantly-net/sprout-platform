package net.savantly.sprout.core.content.contentField;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;

import net.savantly.sprout.core.content.fieldType.FieldType;

@RunWith(SpringRunner.class)
@ContextConfiguration
public class ContentFieldTest {
	
	@Autowired
	ContentFieldRepository repository;
	
	@Test
	public void testContentField() {
		ContentField item = new ContentField();
		item.setName("test");
		item.setFieldType(FieldType.text);
		
		ContentField saved = repository.save(item);
		Assert.assertEquals("name should match", saved.getName(), item.getName());
		Assert.assertEquals("fieldType should match", saved.getFieldType(), item.getFieldType());
	}
	
	@Configuration
	@SpringBootApplication
	@EnableJpaRepositories(basePackages="net.savantly.sprout.core.content")
	@EntityScan(basePackages="net.savantly.sprout.core.content")
	static class configuration {

	}

}
