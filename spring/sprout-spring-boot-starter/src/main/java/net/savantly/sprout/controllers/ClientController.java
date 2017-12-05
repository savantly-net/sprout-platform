package net.savantly.sprout.controllers;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import net.savantly.sprout.settings.AppSetting;
import net.savantly.sprout.settings.AppSettingRepository;
import net.savantly.sprout.settings.UISettings;

@RestController
@RequestMapping("/rest/client")
public class ClientController {

	@Autowired
	AppSettingRepository settings;
	
	public ClientController(AppSettingRepository settings) {
		this.settings = settings;
	}

	@RequestMapping({"/config"})
	@ResponseBody
	public Iterable<AppSetting> config() throws IOException {
		return this.settings.findAll();
	}

}
