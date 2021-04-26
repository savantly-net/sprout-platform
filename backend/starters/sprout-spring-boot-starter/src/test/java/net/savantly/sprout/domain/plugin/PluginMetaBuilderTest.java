package net.savantly.sprout.domain.plugin;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.fail;

import java.io.IOException;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.ActiveProfiles;

import net.savantly.sprout.autoconfigure.SproutAutoConfiguration;
import net.savantly.sprout.core.module.web.plugin.PluginMeta;
import net.savantly.sprout.core.module.web.plugin.PluginType;

@SpringBootTest
@ActiveProfiles("test")
public class PluginMetaBuilderTest {

	@Autowired
	PluginMetaBuilder metaBuilder;

	@Test
	public void extractFromPluginJsonTest() {
		try {
			PluginMeta pluginMeta = metaBuilder.extractFromPluginJson("classpath:/plugins/plugin.json");
			assertEquals(PluginType.panel, pluginMeta.getType());
			assertEquals("description", pluginMeta.getInfo().getDescription());
			assertEquals("authorName", pluginMeta.getInfo().getAuthor().getName());
		} catch (IOException e) {
			System.err.println(e);
			fail();
		}
	}
	
	@Configuration
	@Import(SproutAutoConfiguration.class)
	@EnableAutoConfiguration
	static class TestContext{}
}
