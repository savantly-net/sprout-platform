package net.savantly.sprout.modules.test;

import org.junit.Assert;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.context.WebApplicationContext;

public class TestSproutModuleTest extends SproutModuleTest {
	
	@Autowired
	WebApplicationContext ctx;

	@Test
	public void test() {
		Assert.assertTrue(ctx != null);
	}
	
	
}
