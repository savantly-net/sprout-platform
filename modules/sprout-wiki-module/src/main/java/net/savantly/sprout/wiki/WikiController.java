package net.savantly.sprout.wiki;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import info.bliki.wiki.model.WikiModel;
import net.savantly.sprout.wiki.repository.WikiItemRepository;

@Controller
@RequestMapping("/rest/modules/sprout-wiki")
public class WikiController {
	
	@Autowired
	private WikiItemRepository repository;
	
	private WikiModel wikiModel = new WikiModel(
			"/plugins;id=wikiModule;path=${image}",
			"/plugins;id=wikiModule;path=${title}");

	@RequestMapping(path = "/")
	public ModelAndView index() {
		return renderTemplate("home");
	}

	@RequestMapping(path = "/{id}")
	public ModelAndView getItem(@PathVariable("id") String id) {
		return renderTemplate(id);
	}

	private ModelAndView renderTemplate(String title) {
		WikiItem home = repository.findOne(title);
		if(home == null) {
			home = new WikiItem();
			home.setTitle(title);
			repository.save(home);
		}
		ModelAndView response = new ModelAndView("wikiModule/content");
		response.addObject("title", title);
		response.addObject("content", renderWikiContent(home));
		return response;
	}


	private String renderWikiContent(WikiItem item) {
		try {
			return wikiModel.render(item.getContent());
		} catch (IOException e) {
			return e.getLocalizedMessage();
		}
	}
}
