package net.savantly.sprout.wiki;

import java.io.StringWriter;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import info.bliki.wiki.model.WikiModel;
import net.savantly.sprout.content.contentItem.ContentItemRenderer;
import net.savantly.sprout.core.content.contentItem.ContentItem;

@Service
public class WikiContentRenderer implements ContentItemRenderer {
	private final Logger log = LoggerFactory.getLogger(WikiContentRenderer.class);

	private final WikiModel wikiModel = new WikiModel(
			"/plugins;id=wikiModule;path=${image}",
			"/plugins;id=wikiModule;path=${title}");

	@Override
	public int getPriority() {
		return 1;
	}

	@Override
	public boolean render(ContentItem item, StringWriter writer) {
		if (item.getContentType().getId().equals(WikiFixture.DEFAULT_CONTENT_TYPE_NAME)) {
			log.debug("rendering ContentItem: {}", item.getId());
			renderWikiContent(item, writer);
			return true;
		}
		log.debug("skipping ContentItem: {}", item.getId());
		return false;
	}

	private void renderWikiContent(ContentItem item, StringWriter writer) {
		try {
			item.getFieldValues().forEach((k, v) -> {
				if (k.getName().toLowerCase() == "title") {
					log.debug("writing title: {}", v);
					writer.write(String.format("<h1>%s</h1>", v));
				} else if (k.getName().toLowerCase() == "body") {
					try {
						log.debug("writing body: {}", v);
						writer.write(wikiModel.render(v));
					} catch (Exception ex) {
						log.error("{}", ex);
						writer.write(ex.getLocalizedMessage());
					}
				}
			});
		} catch (Exception ex) {
			log.error("{}", ex);
		}
	}

}
