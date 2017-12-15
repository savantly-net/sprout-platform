package net.savantly.sprout.wiki;

import java.io.IOException;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import info.bliki.wiki.model.WikiModel;

@RestController
@RequestMapping("/rest/modules/sprout-wiki")
public class WikiController {
	
	private WikiModel wikiModel = new WikiModel(
			"/plugins;id=wikiModule;path=${image}",
			"/plugins;id=wikiModule;path=${title}");

	@RequestMapping(path = "/")
	public String index() {
		return "Hello from the wiki module";
	}

	@RequestMapping(path = "/{id}")
	public String getItem(WikiItem item) {
		return renderWikiContent(item);
	}

	private String renderWikiContent(WikiItem item) {
		try {
			return wikiModel.render("This is a simple [[Hello World]] wiki tag");
		} catch (IOException e) {
			return e.getLocalizedMessage();
		}
	}
}
