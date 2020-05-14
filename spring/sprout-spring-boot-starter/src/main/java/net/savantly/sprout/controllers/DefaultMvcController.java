package net.savantly.sprout.controllers;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import net.savantly.sprout.settings.UISettings;

@Controller
public class DefaultMvcController {

	@Autowired
	UISettings uiSettings;

	@GetMapping({ "", "/"})
	public String index() throws IOException {
		return "index";
	}

	@GetMapping({"/admin", "/admin/"})
	public String admin() throws IOException {
		return "admin/index";
	}
}
