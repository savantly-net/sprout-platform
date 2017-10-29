package net.savantly.sprout.autoconfigure;

import java.nio.file.Paths;
import java.util.Map;
import java.util.Optional;

import javax.annotation.PostConstruct;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.AutoConfigureBefore;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.boot.autoconfigure.web.WebMvcAutoConfiguration;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.util.Assert;

import com.fasterxml.jackson.databind.ObjectMapper;

import net.savantly.sprout.core.resource.SproutResourcePatternResolver;
import net.savantly.sprout.core.ui.UiLoader;

@Configuration
@AutoConfigureBefore(WebMvcAutoConfiguration.class)
@ConfigurationProperties("sprout.resources")
public class SproutResourceAutoConfiguration {
	
	private final static Logger log = LoggerFactory.getLogger(SproutResourceAutoConfiguration.class);

	@Value("${info.app.buildNumber:0}")
	private String buildNumber;
	private boolean extract = false;
	private boolean build = false;
	private String extractLocation;
	private String webRoot;
	private String npmBin;
	private String nodeBin;
	private Object hostApp;
	
	public SproutResourceAutoConfiguration(ApplicationContext applicationContext) {
		Map<String,Object> beans = applicationContext.getBeansWithAnnotation(EnableSprout.class);
		Assert.isTrue(beans.size() == 1, String.format("Expected 1 bean with the @EnableSprout annotation, but found %s", beans.size()));
		Optional<String> beanName = beans.keySet().stream().findFirst();
		log.info("Using bean named: {} \t to wire up the Sprout platform", beanName.get());
		hostApp = beans.get(beanName.get());
	}
	
	@PostConstruct
	public void post() {
		if (webRoot == null) {
			this.webRoot = Paths.get(extractLocation, "dist/").toString();
		}
	}

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
	UiLoader defaultUiLoader() throws Exception {
		
		Class<?> clazz = hostApp.getClass();
		
		UiLoader loader = new UiLoader.UiLoaderBuilder().resolver(SproutResourcePatternResolver.of(clazz))
				.hostAppClass(clazz)
				.destinationFolder(extractLocation)
				.compile(build)
				.extract(extract)
				.npmBin(npmBin)
				.nodeBin(nodeBin)
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

	public String getNpmBin() {
		return npmBin;
	}

	public void setNpmBin(String npmBin) {
		this.npmBin = npmBin;
	}

	public String getNodeBin() {
		return nodeBin;
	}

	public void setNodeBin(String nodeBin) {
		this.nodeBin = nodeBin;
	}

}
