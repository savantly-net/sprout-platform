package net.savantly.sprout.core.ui;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.test.context.junit4.SpringRunner;

import net.savantly.sprout.core.resource.SproutResourcePatternResolver;

@RunWith(SpringRunner.class)
public class UiLoaderTest {
	private static final Logger log = LoggerFactory.getLogger(UiLoaderTest.class);
	
	@Test
	public void test() throws Exception {
		Path tmpFolder = Files.createDirectories(Paths.get("target", "ui-test"));
		UiLoader loader = new UiLoader.UiLoaderBuilder()
				.resolver(SproutResourcePatternResolver.of(UiLoaderTest.class))
				.destinationFolder(tmpFolder.toAbsolutePath().toString())
				.zipSearchPattern("**/*.zip")
				.sproutPluginSearchPattern("**/sprout/plugins/**/*.*")
				.overlaySearchPattern("**/sprout/overlay/**/*.*")
				.extract(true)
				.compile(false)
				.build();
	}

}
