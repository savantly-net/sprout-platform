package net.savantly.sprout.module.newsfeed;

import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.core.io.Resource;
import org.springframework.util.FileCopyUtils;

import net.savantly.sprout.core.module.SproutWebModule;

@Configuration
@Import(NewsfeedModuleConfiguration.class)
public class NewsfeedModule implements SproutWebModule {

	public static final String version = "0.0.1";
	protected static final String PLUGIN_ID = "savantly-newsfeed-module";
	
	@Override
	public String getId() {
		return PLUGIN_ID;
	}

	@Override
	public String getVersion() {
		return version;
	}

	@Override
	public String getName() {
		return "Sprout Newsfeed Module";
	}

	@Override
	public String getDescription() {
		return "Provides newsfeed APIs and UI components";
	}

	
	public static String asString(Resource resource) throws IOException {
		Reader reader = new InputStreamReader(resource.getInputStream());
		return FileCopyUtils.copyToString(reader);
    }
}