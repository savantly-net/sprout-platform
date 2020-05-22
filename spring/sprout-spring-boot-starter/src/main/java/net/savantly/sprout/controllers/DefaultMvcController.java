package net.savantly.sprout.controllers;

import java.io.IOException;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class DefaultMvcController {

	@GetMapping({ "", "/"})
	public String index() throws IOException {
		return "index";
	}

	@GetMapping({"/admin", "/admin/"})
	public String admin() throws IOException {
		return "admin/index";
	}
	
	@GetMapping({"/error*"})
	public String error() throws IOException {
		return "error";
	}
}
