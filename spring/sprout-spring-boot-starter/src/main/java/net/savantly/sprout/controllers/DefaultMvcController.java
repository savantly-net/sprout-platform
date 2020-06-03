package net.savantly.sprout.controllers;

import java.io.IOException;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class DefaultMvcController {

	@GetMapping({ "", "/"})
	public String index() throws IOException {
		return "index";
	}

	@RequestMapping(path = {"/admin", "/admin/**"}, method = RequestMethod.GET)
	public String admin() throws IOException {
		return "admin/index";
	}
	
	@GetMapping({"/error*"})
	public String error() throws IOException {
		return "error";
	}
}
