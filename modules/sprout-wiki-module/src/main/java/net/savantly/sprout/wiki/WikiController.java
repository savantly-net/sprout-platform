package net.savantly.sprout.wiki;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rest/modules/sprout-wiki")
public class WikiController {

	@RequestMapping(path="/")
	public String index() {
		return "Hello from the wiki module";
	}
}
