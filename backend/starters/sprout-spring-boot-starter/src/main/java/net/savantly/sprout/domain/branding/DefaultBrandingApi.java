package net.savantly.sprout.domain.branding;

import java.io.IOException;
import java.io.InputStream;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ResourceLoader;
import org.springframework.util.StreamUtils;

import net.savantly.sprout.autoconfigure.properties.SproutConfigurationProperties;

public class DefaultBrandingApi implements BrandingApi {
	private static final Logger log = LoggerFactory.getLogger(DefaultBrandingApi.class);
	
	@Autowired
	ResourceLoader resourceLoader;
	@Autowired
	SproutConfigurationProperties props;

	@Override
	public byte[] getFavicon() {
		String resourcePath = props.getBranding().getFaviconResource();
		try {
			InputStream stream = resourceLoader.getResource(resourcePath).getInputStream();
			return StreamUtils.copyToByteArray(stream);
		} catch (IOException e) {
			log.error("failed to get resource: {}", resourcePath, e);
			return null;
		}
	}

	@Override
	public byte[] getLogo() {
		String resourcePath = props.getBranding().getLogoUrlResource();
		try {
			InputStream stream = resourceLoader.getResource(resourcePath).getInputStream();
			return StreamUtils.copyToByteArray(stream);
		} catch (IOException e) {
			log.error("failed to get resource: {}", resourcePath, e);
			return null;
		}
	}

	@Override
	public byte[] getMiniLogo() {
		String resourcePath = props.getBranding().getMiniLogoResource();
		try {
			InputStream stream = resourceLoader.getResource(resourcePath).getInputStream();
			return StreamUtils.copyToByteArray(stream);
		} catch (IOException e) {
			log.error("failed to get resource: {}", resourcePath, e);
			return null;
		}
	}

}
