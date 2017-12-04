package net.savantly.sprout.controllers;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import net.savantly.sprout.settings.UISettings;

@RestController
@RequestMapping("/rest/client")
public class ClientController {

	@Autowired
	UISettings uiSettings;
	
	public ClientController(UISettings uiSettings) {
		this.uiSettings = uiSettings;
	}

	@RequestMapping({"/config"})
	@ResponseBody
	public Map<String, Object> config() throws IOException {
		HashMap<String, Object> clientConfig = new HashMap<String, Object>();
		clientConfig.put("keywords", uiSettings.getKeywords());
		clientConfig.put("previewImage", uiSettings.getPreviewImage());
		clientConfig.put("showBanner", uiSettings.getShowBanner());
		clientConfig.put("siteBanner", uiSettings.getSiteBanner());
		clientConfig.put("siteDescription", uiSettings.getSiteDescription());
		clientConfig.put("siteName", uiSettings.getSiteName());
		clientConfig.put("siteTitle", uiSettings.getSiteTitle());
		clientConfig.put("siteUrl", uiSettings.getSiteUrl());
		return clientConfig;
	}

}
