package net.savantly.sprout.controllers;

import java.io.IOException;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import net.savantly.sprout.settings.AppSetting;
import net.savantly.sprout.settings.AppSettingRepository;

@RestController
@RequestMapping("/api/client")
public class ClientController {

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
