package net.savantly.sprout.autoconfigure;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.AutoConfigureBefore;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.boot.autoconfigure.web.WebMvcAutoConfiguration;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.fasterxml.jackson.databind.ObjectMapper;

import net.savantly.sprout.core.resource.SproutResourcePatternResolver;
import net.savantly.sprout.core.ui.UiLoader;

@Configuration
@AutoConfigureBefore(WebMvcAutoConfiguration.class)
@ConfigurationProperties("sprout.resources")
public class SproutResourceAutoConfiguration {

	@Value("${info.app.buildNumber:0}")
	private String buildNumber;
	private boolean extract = false;
	private boolean build = false;
	private Path defaultExtractLocation = Paths.get(System.getProperty("user.home"), "sprout-ui");
	private String extractLocation = defaultExtractLocation.toString();
	private String webRoot = String.format("%sdist/", defaultExtractLocation.toUri());

	@Bean
	@ConditionalOnMissingBean(ObjectMapper.class)
	ObjectMapper objectMapper() {
		return new ObjectMapper();
	}

/*	@Bean
	@ConditionalOnMissingBean(ResourceUrlFormatter.class)
	public ResourceUrlFormatter resourceUrlFormatter(SproutConfiguration controllerConfiguration) {
		String cacheBustString = "?v=" + buildNumber;
		return new DefaultResourceUrlFormatter(true, controllerConfiguration.getResourcePath(), cacheBustString);
	}*/

	@Bean
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@ConditionalOnProperty("sprout.resources.extract")
	UiLoader defaultUiLoader() throws IOException, InterruptedException {
		
		UiLoader loader = new UiLoader.UiLoaderBuilder().resolver(SproutResourcePatternResolver.of(SproutResourceAutoConfiguration.class))
				.destinationFolder(extractLocation)
				.searchPattern("classpath*:/**/*-resources.zip")
				.compile(build)
				.extract(extract)
				.build();
		return loader;
	}

	public boolean isExtract() {
		return extract;
	}

	public void setExtract(boolean extract) {
		this.extract = extract;
	}

	public boolean isBuild() {
		return build;
	}

	public void setBuild(boolean build) {
		this.build = build;
	}

	public String getLocation() {
		return extractLocation;
	}

	public void setLocation(String location) {
		this.extractLocation = location;
	}

	public String getExtractLocation() {
		return extractLocation;
	}

	public void setExtractLocation(String extractLocation) {
		this.extractLocation = extractLocation;
	}

	public String getWebRoot() {
		return webRoot;
	}

	public void setWebRoot(String webRoot) {
		this.webRoot = webRoot;
	}

}
