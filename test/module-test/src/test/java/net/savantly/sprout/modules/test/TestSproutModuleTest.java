package net.savantly.sprout.modules.test;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.context.WebApplicationContext;

public class TestSproutModuleTest extends SproutModuleTest {
	
	@Autowired
	WebApplicationContext ctx;

	@Test
	public void test() {
		Assertions.assertTrue(ctx != null);
	}
	
	
}
