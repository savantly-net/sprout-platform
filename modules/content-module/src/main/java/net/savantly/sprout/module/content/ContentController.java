package net.savantly.sprout.module.content;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/admin/content")
public class ContentController {

	@GetMapping
	public String index() {
		return "content/index";
	}
}
