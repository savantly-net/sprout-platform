package net.savantly.sprout.core.domain.module;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.fail;

import org.junit.jupiter.api.Test;

import net.savantly.sprout.core.module.SproutWebModule;
import net.savantly.sprout.core.module.web.plugin.PluginMeta;
import net.savantly.sprout.core.module.web.plugin.PluginType;

public class SproutWebModuleTest {

	@Test
	public void extractFromPluginJsonTest() {
		try {
			SproutWebModule m = new SproutWebModule() {
				
				@Override
				public String getVersion() {
					// TODO Auto-generated method stub
					return null;
				}
				
				@Override
				public String getName() {
					// TODO Auto-generated method stub
					return null;
				}
				
				@Override
				public String getId() {
					return "test";
				}
				
				@Override
				public String getDescription() {
					// TODO Auto-generated method stub
					return null;
				}
			};
			PluginMeta pluginMeta = m.getPluginMeta();
			assertEquals(PluginType.panel, pluginMeta.getType());
			assertEquals("description", pluginMeta.getInfo().getDescription());
			assertEquals("authorName", pluginMeta.getInfo().getAuthor().getName());
		} catch (Exception e) {
			System.err.println(e);
			fail();
		}
	}
}
